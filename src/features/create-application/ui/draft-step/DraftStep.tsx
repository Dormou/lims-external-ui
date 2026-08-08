import { FormProvider, useForm, type FieldErrors } from 'react-hook-form'
import { useState } from 'react'
import { Tabs, Group, Tooltip, Button, Stack } from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { draftSchema } from '../../model/draftSchema'
import {
  useGenerateApplicationMutation,
  useSaveDraftMutation,
} from '../../api/createApplicationApi'
import { useUserConfirmationPolling } from '../../lib/useUserConfirmationPollling'
import { useAutoSave } from '../../lib/useAutoSave'
import { GeneralInfoTab } from '../draft-tabs/GeneralInfoTab'
import { ParametersTab } from '../draft-tabs/ParametersTab'
import { TestsTab } from '../draft-tabs/TestsTab'
import { DocsTab } from '../draft-tabs/DocsTab'
import { useDraftRestore } from '../../lib/useDraftRestore'
import { draftFilesSchema } from '../../model/draftFilesSchema'
import type { DraftForm } from '../../model/draftSchema'
import type { DraftFilesForm } from '../../model/draftFilesSchema'
import type { Application } from '@/entities/application'
import styles from './DraftStep.module.css'

type Tab = 'general' | 'params' | 'tests' | 'docs'

export const DraftStep = ({ application }: { application: Application }) => {
  const [saveDraft, { isLoading: isSaving }] = useSaveDraftMutation()
  const [generateApplication, { isLoading: isGenerating }] =
    useGenerateApplicationMutation()

  // Активная вкладка
  const [activeTab, setActiveTab] = useState<Tab>('general')

  // Основная форма
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

  // Форма с файлами
  const draftFilesForm = useForm<DraftFilesForm>({
    defaultValues: {
      regulatoryDocument: null,
      additionalDocuments: [],
    },
    resolver: zodResolver(draftFilesSchema),
    mode: 'onSubmit',
  })

  // Подтверждение пользователя
  const { isUserConfirmed, confirmComment } = useUserConfirmationPolling()
  // Восстановление черновика
  useDraftRestore(application, draftForm, draftFilesForm)
  // Автосохранение черновика
  const { skipSaving, restoreSaving } = useAutoSave(application.id, draftForm)

  // Проверка валидации формы с файлами
  const validateFiles = async () => {
    return draftFilesForm.trigger()
  }

  // Вызывается только когда основная форма проходит валидацию
  const onValidSubmit = async (data: DraftForm) => {
    // Валидируем форму с файлами
    if (!(await validateFiles())) {
      console.log('Исправьте ошибки в разделе Техническая документация')
      return
    }

    // Отключаем автосохранение
    skipSaving()

    // Сохраняем в ручном режиме
    try {
      await saveDraft({
        id: application.id,
        draft: data,
      }).unwrap()
    } catch (error) {
      console.log('Не удалось сохранить черновик заявки')
      restoreSaving()
      return
    }

    // Формируем заявку
    try {
      await generateApplication(application.id).unwrap()
    } catch (error) {
      console.log('Не удалось сформировать заявку')
    }

    // Восстанавливаем автосохранение
    restoreSaving()
  }

  // Вызывается при наличии ошибок основной формы
  const onInvalidSubmit = async (errors: FieldErrors<DraftForm>) => {
    const isFilesValid = await validateFiles()

    // Ошибка в разделе Общая информация
    const generalError = Object.values(errors).find((error) => error.message)
    if (generalError) {
      console.log('Исправьте ошибки в разделе Общая информация')
      return
    }

    // Ошибка в разделе Характеристики объектов и испытаний
    const parametersError = Array.isArray(errors.samples)
    if (parametersError) {
      console.log(
        'Исправьте ошибки в разделе Характеристики объектов и испытаний'
      )
      return
    }

    // Ошибка в разделе Техническая документация
    if (!isFilesValid) {
      console.log('Исправьте ошибки в разделе Техническая документация')
      return
    }

    console.log('Неизвестная ошибка валидации')
  }

  return (
    <Stack w="stretch" h="stretch">
      <Tabs
        display="flex"
        flex="1 1 auto"
        className={styles.tabsContent}
        value={activeTab}
        onChange={(value) => setActiveTab((value as Tab) ?? 'general')}
        variant="custom"
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab value="general">Общая информация</Tabs.Tab>
          <Tabs.Tab value="params">Характеристики объектов испытаний</Tabs.Tab>
          <Tabs.Tab value="tests">Требования к испытаниям</Tabs.Tab>
          <Tabs.Tab value="docs">Техническая документация</Tabs.Tab>
        </Tabs.List>

        <FormProvider {...draftForm}>
          <Tabs.Panel value="general" h="stretch">
            <GeneralInfoTab />
          </Tabs.Panel>
          <Tabs.Panel value="params" h="stretch">
            <ParametersTab />
          </Tabs.Panel>
          <Tabs.Panel value="tests" h="stretch">
            <TestsTab />
          </Tabs.Panel>
        </FormProvider>

        <FormProvider {...draftFilesForm}>
          <Tabs.Panel value="docs" h="stretch">
            <DocsTab applicationId={application.id} />
          </Tabs.Panel>
        </FormProvider>
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
  )
}
