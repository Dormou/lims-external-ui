import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../store'
import { useSaveDraftMutation } from '../../../api/applications/applicationsApi'

export const useAutoSave = () => {
  const currentStep = useAppSelector((state) => state.applicationsSlice.currentStep)
  const id = useAppSelector((state) => state.applicationsSlice.applicationId)
  const branchId = useAppSelector((state) => state.applicationsSlice.branchId)
  const equipmentTypeId = useAppSelector((state) => state.applicationsSlice.equipmentTypeId)
  const objects = useAppSelector((state) => state.applicationsSlice.objects)
  const parameters = useAppSelector((state) => state.applicationsSlice.parameters)
  const tests = useAppSelector((state) => state.applicationsSlice.tests)
  const producerName = useAppSelector((state) => state.applicationsSlice.producerName)
  const producerAddress = useAppSelector((state) => state.applicationsSlice.producerAddress)
  const regulatoryDocument = useAppSelector((state) => state.applicationsSlice.regulatoryDocument)
  const additionalDocuments = useAppSelector((state) => state.applicationsSlice.additionalDocuments)

  const [saveDraft] = useSaveDraftMutation()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (currentStep !== 1) return
    if (!id) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const formData = new FormData()

      formData.append('branchId', branchId || '')
      formData.append('equipmentTypeId', equipmentTypeId || '')
      formData.append('producerName', producerName || '')
      formData.append('producerAddress', producerAddress || '')

      const samples = objects.map((obj: any) => {
        // Собираем параметры для данного объекта
        const parameterValues = Object.keys(parameters).map(
          (paramId) => ({
            parameterId: paramId,
            parameterValue: parameters[paramId]?.[obj.id] ?? null,
          }),
        )

        // Собираем тесты для данного объекта
        const testValues = Object.keys(tests).map((testId) => ({
          testId: testId,
          testValue: tests[testId]?.[obj.id] ?? false,
        }))

        return {
          name: obj.name || '',
          parameterValues: parameterValues,
          testValues: testValues,
        }
      })
      formData.append('samples', JSON.stringify(samples))

      if (regulatoryDocument) {
        formData.append('regulatoryDocument', regulatoryDocument)
      }

      additionalDocuments?.forEach((file: File) => {
        formData.append('additionalDocuments', file)
      })

      try {
        await saveDraft({id: id, formData: formData}).unwrap()
      } catch (e) {
        console.error('Ошибка автосохранения:', e)
      }
    }, 2000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [
    currentStep,
    id,
    branchId,
    equipmentTypeId,
    objects,
    parameters,
    tests,
    producerName,
    producerAddress,
    regulatoryDocument,
    additionalDocuments,
  ])
}
