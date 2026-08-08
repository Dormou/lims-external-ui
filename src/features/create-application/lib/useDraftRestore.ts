import { useEffect } from 'react'
import { useGetMetadataQuery } from '../api/createApplicationApi'
import { draftLoadingSchema } from '../model/draftSchema'
import { getActiveMeta, getEmptyParams, getEmptyTests } from './helpers'
import type { DraftForm, SampleForm } from '../model/draftSchema'
import type { UseFormReturn } from 'react-hook-form'
import type { DraftFilesForm } from '../model/draftFilesSchema'
import type { Application } from '@/entities/application'

export const useDraftRestore = (
  application: Application,
  draft: UseFormReturn<DraftForm>,
  draftFiles: UseFormReturn<DraftFilesForm>
) => {
  const { data: metadata } = useGetMetadataQuery()

  // Восстановление формы после загрузки
  useEffect(() => {
    if (!application?.draft || !metadata) return

    draftFiles.reset({
      regulatoryDocument: application.regulatoryDocument,
      additionalDocuments: application.additionalDocuments,
    })

    const draftData = draftLoadingSchema.safeParse(application.draft)
    if (!draftData.data) {
      console.log(
        'Ошибка парсинга: не удалось восстановить данные заявки по схеме'
      )
      return
    }
    const restoredData = draftData.data

    if (!restoredData.equipmentTypeId || !restoredData.branchId) {
      draft.reset({ ...restoredData })
      return
    }

    const activeMeta = getActiveMeta(
      metadata,
      restoredData.branchId,
      restoredData.equipmentTypeId
    )

    if (!activeMeta) {
      console.log('Текущий филиал или тип оборудования не найден в метаданных')
      return
    }

    const restoreSamples: SampleForm[] = []

    for (const sample of restoredData.samples) {
      // Восстановление параметров
      const restoreParams = getEmptyParams(activeMeta)
      for (const param of sample.parameterValues) {
        const foundParam = restoreParams.find(
          (item) => item.parameterId === param.parameterId
        )
        if (foundParam) foundParam.parameterValue = param.parameterValue
        else
          console.log(
            `Не найден параметр: [${param.parameterId}; ${param.parameterValue}]`
          )
      }

      // Восстановление тестов
      const restoreTests = getEmptyTests(activeMeta)
      for (const test of sample.testValues) {
        const foundTest = restoreTests.find(
          (item) => item.testId === test.testId
        )
        if (foundTest) foundTest.testValue = test.testValue
        else console.log(`Не найден тест: [${test.testId}; ${test.testValue}]`)
      }
      // Собираем восстановленные сэмплы
      restoreSamples.push({
        ...sample,
        parameterValues: restoreParams,
        testValues: restoreTests,
      })
    }

    const restoredDraft = {
      ...restoredData,
      samples: restoreSamples,
    }

    draft.reset(restoredDraft)
  }, [application, metadata])
}
