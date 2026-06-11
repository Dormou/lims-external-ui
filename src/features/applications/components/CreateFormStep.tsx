import { Box, Tabs, Group, Tooltip, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { GeneralInfoTab } from './GeneralInfoTab'
import { ParametersTab } from './ParametersTab'
import { TestsTab } from './TestsTab'
import { DocsTab } from './DocsTab'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { useGenerateApplicationMutation, useSaveDraftMutation } from '../../../api/applications/applicationsApi'
import { useGetMetadataQuery } from '../../../api/references/referencesApi'
import { applicationsSlice } from '../applicationStore'
import type { EquipmentTypeMeta, ParameterMeta, TestMeta } from '../../../api/applications/types/types'

export const CreateFormStep = () => {
  const dispatch = useAppDispatch()
  
  const [isGenerating, setIsGenerating] = useState(false)

  const { data: metadata } = useGetMetadataQuery()

  const [saveDraft] = useSaveDraftMutation()
  const [generateApplication] = useGenerateApplicationMutation()

  const state = useAppSelector((state) => state.applicationsSlice)

  const getActiveMetadata = () => {
    if (!metadata)
      return {
        parameters: [],
        tests: []
      }

    const branch = metadata.find((b) => b.branchId === state.branchId)
    const equipment = branch?.equipmentTypes.find(
      (t: EquipmentTypeMeta) => t.equipmentTypeId === state.equipmentTypeId,
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
      !!state.branchId && !!state.equipmentTypeId && !!state.producerName && !!state.producerAddress

    // Проверяем, что у всех объектов есть имена
    const areObjectsNamed = state.objects.every((obj) => obj.name.trim().length > 0)

    // Проверяем таблицу параметров
    const areParametersValid = metaParams.every((param) =>
      state.objects.every((obj) => {
        const val = state.parameters[param.parameterId]?.[obj.id] || ''
        return validateField(val, param)
      }),
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
      const parameterValues = Object.keys(state.parameters).map(
        (paramId) => ({
          parameterId: paramId,
          parameterValue: state.parameters[paramId]?.[obj.id] ?? null,
        }),
      )

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
      await saveDraft({id: state.applicationId, formData: createFormData()}).unwrap()
      const fileData = await generateApplication(state.applicationId).unwrap()
      dispatch(applicationsSlice.actions.setGeneratedFile(fileData))
      dispatch(applicationsSlice.actions.setStep(2))
    } catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors: string[] = error.response.data.errors

        backendErrors.forEach((errText) => {
          notifications.show({
            title: 'Ошибка валидации заявки',
            message: errText,
            color: 'red',
            autoClose: 5000,
          })
        })
      } else {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось сформировать заявку. Попробуйте позже.',
          color: 'red',
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }
  return (
    <Box
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Tabs
        value={state.activeTab}
        onChange={(val) => dispatch(applicationsSlice.actions.setActiveTab(val as any || 'general'))}
        variant='custom'
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <Tabs.List style={{ flexShrink: 0 }}>
          <Tabs.Tab value='general'>Общая информация</Tabs.Tab>
          <Tabs.Tab value='params'>Характеристики объектов испытаний</Tabs.Tab>
          <Tabs.Tab value='tests'>Требования к испытаниям</Tabs.Tab>
          <Tabs.Tab value='docs'>Техническая документация</Tabs.Tab>
        </Tabs.List>

        <Box style={{ padding: '24px 0' }}>
          <Tabs.Panel
            value='general'
          >
            <GeneralInfoTab />
          </Tabs.Panel>
          <Tabs.Panel value='params'>
            <ParametersTab />
          </Tabs.Panel>
          <Tabs.Panel value='tests'>
            <TestsTab />
          </Tabs.Panel>
          <Tabs.Panel value='docs'>
            <DocsTab />
          </Tabs.Panel>
        </Box>
      </Tabs>

      <Group justify='center'>
        <Tooltip
          label='Пожалуйста, заполните обязательные поля формы и данные в Личном кабинете'
          disabled={isFormValid}
          multiline
          w={300}
          withArrow
          position='top'
        >
          <div style={{ display: 'inline-block' }}>
            <Button
              variant='filled'
              size='lg'
              disabled={!isFormValid}
              loading={isGenerating}
              onClick={handleGenerate}
              style={{ cursor: !isFormValid ? 'not-allowed' : 'pointer' }}
            >
              Сформировать заявку
            </Button>
          </div>
        </Tooltip>
      </Group>
    </Box>
  )
}
