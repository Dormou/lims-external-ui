import {
  FormProvider,
  useForm,
  type FieldErrors,
  type FieldValues,
} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Tabs, Group, Tooltip, Button, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  draftSchema,
  type DraftForm,
  type SampleForm,
} from '../../model/draftSchema'
import { useGetApplication } from '../../lib/useGetApplication'
import {
  useGenerateApplicationMutation,
  useGetMetadataQuery,
  useSaveDraftMutation,
} from '../../api/createApplicationApi'
import { getActiveMeta, getEmptyParams, getEmptyTests } from '../../lib/helpers'
import { useUserConfirmationPolling } from '../../lib/useUserConfirmationPollling'
import { useAutoSave } from '../../lib/useAutoSave'
import { GeneralInfoTab } from '../draft-tabs/GeneralInfoTab'
import { ParametersTab } from '../draft-tabs/ParametersTab'
import { TestsTab } from '../draft-tabs/TestsTab'
import { DocsTab } from '../draft-tabs/DocsTab'
import styles from './DraftStep.module.css'

type Tab = 'general' | 'params' | 'tests' | 'docs'

export const DraftStep = () => {
  const { applicationId, draftData, applicationData } = useGetApplication()
  const { data: metadata } = useGetMetadataQuery()
  const { isUserConfirmed, confirmComment } = useUserConfirmationPolling()

  const [saveDraft, { isLoading: isSaving }] = useSaveDraftMutation()
  const [generateApplication, { isLoading: isGenerating }] =
    useGenerateApplicationMutation()

  const [activeTab, setActiveTab] = useState<Tab>('general')

  /** Для правильной работы формы на этапах параметров и тестов
   *  необходимо чтобы оперируемые данные находились до
   *  загрузки инпутов. Из-за того что параметры и тесты
   *  не содержаться все сразу в application.draft.samples
   *  привязка к ним осуществляется на 3 этапах:
   *  - При загрузке формы
   *  - При создании нового объекта
   *  - При смене equipmentTypeId
   */
  const draftForm = useForm<DraftForm>({
    defaultValues: {
      branchId: '',
      equipmentTypeId: '',
      producerName: '',
      producerAddress: '',
      samples: [],
    },
    resolver: zodResolver(draftSchema),
    mode: 'onSubmit',
  })

  const { skipSaving, restoreSaving } = useAutoSave({
    form: draftForm,
    id: applicationId,
  })

  // Восстановление формы после загрузки
  useEffect(() => {
    if (draftData && metadata) {
      const { branchId, equipmentTypeId } = draftData

      if (equipmentTypeId === '') {
        draftForm.reset({ ...draftData })
        return
      }

      const activeMeta = getActiveMeta(metadata, branchId, equipmentTypeId)

      if (activeMeta) {
        const restoreSamples: SampleForm[] = []

        for (const sample of draftData.samples) {
          // Восстановление параметров
          const restoreParams = getEmptyParams(activeMeta)
          for (const param of sample.parameterValues) {
            const foundParam = restoreParams.find(
              (item) => item.parameterId === param.parameterId
            )
            if (foundParam) foundParam.parameterValue = param.parameterValue
          }

          // Восстановление тестов
          const restoreTests = getEmptyTests(activeMeta)
          for (const test of sample.testValues) {
            const foundTest = restoreTests.find(
              (item) => item.testId === test.testId
            )
            if (foundTest) foundTest.testValue = test.testValue
          }
          // Собираем восстановленные сэмплы
          restoreSamples.push({
            ...sample,
            parameterValues: restoreParams,
            testValues: restoreTests,
          })
        }

        draftForm.reset({
          ...draftData,
          samples: restoreSamples,
        })
      } else {
        notifications.show({
          title: 'Не удалось восстановить данные заявки',
          message: 'Нет данных для выбранного филиала или типа оборудования',
          color: 'errorRed',
          autoClose: 5000,
        })
      }
    }
  }, [draftData, metadata])

  // Вызывается только когда форма проходит валидацию
  const onValidSubmit = async (data: DraftForm) => {
    if (!applicationId) return

    //!!! Проверка обязательного файла (пока не находится в черновике - валидация вручную)
    if (!applicationData?.regulatoryDocument) {
      notifications.show({
        title: 'Ошибка валидации заявки',
        message:
          'Не выбран нормативный документ в разделе Техническая документация',
        color: 'errorRed',
        autoClose: 5000,
      })
      return
    }

    skipSaving()
    try {
      await saveDraft({
        id: applicationId,
        draft: draftForm.getValues(),
      }).unwrap()
    } catch (e) {
      notifications.show({
        title: 'Ошибка запроса',
        message: 'Не удалось сохранить черновик заявки',
        color: 'errorRed',
        autoClose: 5000,
      })
      restoreSaving()
      return
    }

    try {
      await generateApplication(applicationId).unwrap()
    } catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors: string[] = error.response.data.errors

        backendErrors.forEach((errText) => {
          notifications.show({
            title: 'Ошибка валидации заявки',
            message: errText,
            color: 'errorRed',
            autoClose: 5000,
          })
        })
      } else {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось сформировать заявку. Попробуйте позже.',
          color: 'errorRed',
        })
      }
    }
    restoreSaving()
  }

  const getFirstErrorMessage = (
    errors: FieldErrors<FieldValues>
  ): string | null => {
    if (!errors || typeof errors !== 'object') return null

    // Проверяем, является ли текущий объект ошибкой со свойством message
    if ('message' in errors && typeof errors.message === 'string') {
      return errors.message
    }

    // Рекурсивно перебираем все вложенные ключи (поля формы, индексы массивов)
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        // Приводим вложенный элемент к типу FieldErrors, так как структура рекурсивна
        const nestedError = errors[key] as FieldErrors<FieldValues> | undefined

        if (nestedError) {
          const result = getFirstErrorMessage(nestedError)
          if (result) return result // Нашли первую ошибку — сразу возвращаем
        }
      }
    }

    return null
  }

  // Вызывается при наличии ошибок формы
  const onInvalidSubmit = (errors: FieldErrors<DraftForm>) => {
    const firstError = getFirstErrorMessage(errors)
    notifications.show({
      title: 'Ошибка валидации заявки',
      message: firstError ?? 'Неизвестная ошибка',
      color: 'errorRed',
      autoClose: 5000,
    })
    console.log(firstError)
  }

  return (
    <FormProvider {...draftForm}>
      <Stack w="stretch" h="stretch">
        <Tabs
          display="flex"
          flex="1 1 auto"
          className={styles.tabsContent}
          value={activeTab}
          onChange={(value) => setActiveTab((value as Tab) ?? 'general')}
          variant="custom"
        >
          <Tabs.List>
            <Tabs.Tab value="general">Общая информация</Tabs.Tab>
            <Tabs.Tab value="params">
              Характеристики объектов испытаний
            </Tabs.Tab>
            <Tabs.Tab value="tests">Требования к испытаниям</Tabs.Tab>
            <Tabs.Tab value="docs">Техническая документация</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" h="stretch">
            <GeneralInfoTab />
          </Tabs.Panel>
          <Tabs.Panel value="params" h="stretch">
            <ParametersTab />
          </Tabs.Panel>
          <Tabs.Panel value="tests" h="stretch">
            <TestsTab />
          </Tabs.Panel>
          <Tabs.Panel value="docs" h="stretch">
            <DocsTab />
          </Tabs.Panel>
        </Tabs>

        <Group justify="center" flex="0 0 auto">
          <Tooltip
            label={confirmComment}
            disabled={isUserConfirmed}
            multiline
            w={300}
            withArrow
            position="top"
          >
            <Button
              variant="filled"
              type="submit"
              size="lg"
              disabled={!isUserConfirmed}
              loading={isGenerating || isSaving}
              onClick={draftForm.handleSubmit(onValidSubmit, onInvalidSubmit)}
            >
              Сформировать заявку
            </Button>
          </Tooltip>
        </Group>
      </Stack>
    </FormProvider>
  )
}
