import type {
  BranchMeta,
  EquipmentTypeMeta,
} from '@/entities/metadata/model/branchMeta'
import type { SampleParameterForm, SampleTestForm } from '../model/draftSchema'

/** Получить данные о параметрах и тестах от выбраных филиала и типа оборудования */
export const getActiveMeta = (
  metadata: BranchMeta[] | undefined,
  branchId: string | null,
  equipmentTypeId: string | null
) => {
  if (!branchId || !equipmentTypeId) return null
  return (
    metadata
      ?.find((branch) => branch.branchId === branchId)
      ?.equipmentTypes.find(
        (type) => type.equipmentTypeId === equipmentTypeId
      ) ?? null
  )
}

/** Получить список параметров без значений (кроме констант) по текущим данным */
export const getEmptyParams = (
  activeMeta: EquipmentTypeMeta
): SampleParameterForm[] => {
  return activeMeta.parameters.map((param) => ({
    ...param,
    parameterValue:
      param.valueType === 'Constant' && param.allowedValues
        ? param.allowedValues[0]
        : '',
  }))
}

/** Получить список тестов без значений по текущим данным */
export const getEmptyTests = (
  activeMeta: EquipmentTypeMeta
): SampleTestForm[] => {
  return activeMeta.tests.map((test) => ({
    ...test,
    testValue: false,
  }))
}
