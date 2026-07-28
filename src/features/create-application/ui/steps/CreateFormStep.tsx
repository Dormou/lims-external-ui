import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tabs, Group, Tooltip, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  setActiveTab,
  setGeneratedFile,
  setStep,
} from '../../model/createApplicationSlice'
import {
  useGetMetadataQuery,
  useSaveDraftMutation,
  useGenerateApplicationMutation,
} from '../../api/createApplicationApi'
import type {
  EquipmentTypeMeta,
  ParameterMeta,
  TestMeta,
} from '../../model/types/branchMeta'
import { GeneralInfoTab } from '../tabs/GeneralInfoTab'
import { ParametersTab } from '../tabs/ParametersTab'
import { TestsTab } from '../tabs/TestsTab'
import { DocsTab } from '../tabs/DocsTab'
import styles from './CreateFormStep.module.css'

export const CreateFormStep = () => {
  const dispatch = useDispatch()

  const [isGenerating, setIsGenerating] = useState(false)

  const { data: metadata } = useGetMetadataQuery()

  const [saveDraft] = useSaveDraftMutation()
  const [generateApplication] = useGenerateApplicationMutation()

  const state = useSelector((state) => state.createApplication)

  const getActiveMetadata = () => {
    if (!metadata)
      return {
        parameters: [],
        tests: [],
      }

    const branch = metadata.find((b) => b.branchId === state.branchId)
    const equipment = branch?.equipmentTypes.find(
      (t: EquipmentTypeMeta) => t.equipmentTypeId === state.equipmentTypeId
    )

    return {
      parameters: (equipment?.parameters || []) as ParameterMeta[],
      tests: (equipment?.tests || []) as TestMeta[],
    }
  }

  const validateField = (value: string, param: ParameterMeta): boolean => {
    const { valueType, minValue, maxValue } = param
    if (!value) return false

    const numValue = Number(value.replace(',', '.'))
    if (valueType === 'Integer' || valueType === 'Decimal') {
      if (isNaN(numValue)) return false
      if (minValue && numValue < Number(minValue)) return false
      if (maxValue && numValue > Number(maxValue)) return false
    }
    if (valueType === 'String') {
      if (minValue && value.length < Number(minValue)) return false
      if (maxValue && value.length > Number(maxValue)) return false
    }
    return true
  }

  const isFormValid = (() => {
    const { parameters: metaParams } = getActiveMetadata()

    //Проверяем General Info
    const isGeneralValid =
      !!state.branchId &&
      !!state.equipmentTypeId &&
      !!state.producerName &&
      !!state.producerAddress

    // Проверяем, что у всех объектов есть имена
    const areObjectsNamed = state.objects.every(
      (obj) => obj.name.trim().length > 0
    )

    // Проверяем таблицу параметров
    const areParametersValid = metaParams.every((param) =>
      state.objects.every((obj) => {
        const val = state.parameters[param.parameterId]?.[obj.id] || ''
        return validateField(val, param)
      })
    )

    // Проверяем наличие обязательных документов
    const areDocumentsValid = !!state.regulatoryDocument

    return (
      isGeneralValid &&
      areObjectsNamed &&
      areParametersValid &&
      areDocumentsValid &&
      state.isUserConfirmed
    )
  })()

  const createFormData = () => {
    const formData = new FormData()

    formData.append('branchId', state.branchId || '')
    formData.append('equipmentTypeId', state.equipmentTypeId || '')
    formData.append('producerName', state.producerName || '')
    formData.append('producerAddress', state.producerAddress || '')

    const samples = state.objects.map((obj: any) => {
      // Собираем параметры для данного объекта
      const parameterValues = Object.keys(state.parameters).map((paramId) => ({
        parameterId: paramId,
        parameterValue: state.parameters[paramId]?.[obj.id] ?? null,
      }))

      // Собираем тесты для данного объекта
      const testValues = Object.keys(state.tests).map((testId) => ({
        testId: testId,
        testValue: state.tests[testId]?.[obj.id] ?? false,
      }))

      return {
        name: obj.name || '',
        parameterValues: parameterValues,
        testValues: testValues,
      }
    })
    formData.append('samples', JSON.stringify(samples))

    if (state.regulatoryDocument) {
      formData.append('regulatoryDocument', state.regulatoryDocument)
    }

    state.additionalDocuments?.forEach((file: File) => {
      formData.append('additionalDocuments', file)
    })

    return formData
  }

  const handleGenerate = async () => {
    if (!state.applicationId) return
    setIsGenerating(true)

    try {
      await saveDraft({
        id: state.applicationId,
        formData: createFormData(),
      }).unwrap()
      const fileData = await generateApplication(state.applicationId).unwrap()
      dispatch(setGeneratedFile(fileData))
      dispatch(setStep(2))
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
    } finally {
      setIsGenerating(false)
    }
  }
  return (
    <Box
      display="flex"
      w="100%"
      flex="1 1 auto"
      className={styles.createFormStepContent}
    >
      <Tabs
        display="flex"
        flex="1 1 auto"
        className={styles.tabsContent}
        value={state.activeTab}
        onChange={(val) => dispatch(setActiveTab((val as any) || 'general'))}
        variant="custom"
      >
        <Tabs.List flex="0 0 auto">
          <Tabs.Tab value="general">Общая информация</Tabs.Tab>
          <Tabs.Tab value="params">Характеристики объектов испытаний</Tabs.Tab>
          <Tabs.Tab value="tests">Требования к испытаниям</Tabs.Tab>
          <Tabs.Tab value="docs">Техническая документация</Tabs.Tab>
        </Tabs.List>

        <Box py={24}>
          <Tabs.Panel value="general">
            <GeneralInfoTab />
          </Tabs.Panel>
          <Tabs.Panel value="params">
            <ParametersTab />
          </Tabs.Panel>
          <Tabs.Panel value="tests">
            <TestsTab />
          </Tabs.Panel>
          <Tabs.Panel value="docs">
            <DocsTab />
          </Tabs.Panel>
        </Box>
      </Tabs>

      <Group justify="center">
        <Tooltip
          label="Пожалуйста, заполните обязательные поля формы и данные в Личном кабинете"
          disabled={isFormValid}
          multiline
          w={300}
          withArrow
          position="top"
        >
          <Box display="inline-block">
            <Button
              variant="filled"
              size="lg"
              disabled={!isFormValid}
              loading={isGenerating}
              onClick={handleGenerate}
              style={{ cursor: !isFormValid ? 'not-allowed' : 'pointer' }}
            >
              Сформировать заявку
            </Button>
          </Box>
        </Tooltip>
      </Group>
    </Box>
  )
}
