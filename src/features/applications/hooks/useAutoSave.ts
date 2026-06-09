import { useEffect, useRef } from "react"
import { useAppSelector } from '../../../store'
import { useSaveDraftMutation } from '../applicationsApi'

export const useAutoSave = () => {
  const currentStep = useAppSelector((state) => state.applicationsSlice.currentStep)
  const id = useAppSelector((state) => state.applicationsSlice.id)
  const branchId = useAppSelector((state) => state.applicationsSlice.branchId)
  const equipmentTypeId = useAppSelector((state) => state.applicationsSlice.equipmentTypeId)
  const objects = useAppSelector((state) => state.applicationsSlice.objects)
  const parameters = useAppSelector((state) => state.applicationsSlice.parameters)
  const tests = useAppSelector((state) => state.applicationsSlice.tests)
  const producerName = useAppSelector((state) => state.applicationsSlice.producerName)
  const producerAddress = useAppSelector((state) => state.applicationsSlice.producerAddress)
  const regulatoryDocument = useAppSelector((state) => state.applicationsSlice.regulatoryDocument)
  const specification = useAppSelector((state) => state.applicationsSlice.specification)
  const shema = useAppSelector((state) => state.applicationsSlice.shema)
  const additionalDocuments = useAppSelector((state) => state.applicationsSlice.additionalDocuments)

  const [saveDraft] = useSaveDraftMutation()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (currentStep !== 1) return
    if (!id) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const payload = {
        id,
        branchId,
        equipmentTypeId,
        objects,
        parameters,
        tests,
        producerName,
        producerAddress,
        regulatoryDocument,
        specification,
        shema,
        additionalDocuments,
      }
      try {
        await saveDraft(payload).unwrap()
      } catch (e) {
        console.error("Ошибка автосохранения:", e)
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
    specification,
    shema,
    additionalDocuments,
  ])
}
