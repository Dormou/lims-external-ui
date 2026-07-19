import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSaveDraftMutation } from '../api/createApplicationApi'

export const useAutoSave = () => {
  const currentStep = useSelector(
    (state) => state.createApplication.currentStep
  )
  const id = useSelector((state) => state.createApplication.applicationId)
  const branchId = useSelector((state) => state.createApplication.branchId)
  const equipmentTypeId = useSelector(
    (state) => state.createApplication.equipmentTypeId
  )
  const objects = useSelector((state) => state.createApplication.objects)
  const parameters = useSelector((state) => state.createApplication.parameters)
  const tests = useSelector((state) => state.createApplication.tests)
  const producerName = useSelector(
    (state) => state.createApplication.producerName
  )
  const producerAddress = useSelector(
    (state) => state.createApplication.producerAddress
  )
  const regulatoryDocument = useSelector(
    (state) => state.createApplication.regulatoryDocument
  )
  const additionalDocuments = useSelector(
    (state) => state.createApplication.additionalDocuments
  )

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
        const parameterValues = Object.keys(parameters).map((paramId) => ({
          parameterId: paramId,
          parameterValue: parameters[paramId]?.[obj.id] ?? null,
        }))

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
        await saveDraft({ id: id, formData: formData }).unwrap()
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
