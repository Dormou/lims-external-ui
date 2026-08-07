import type { ValueType } from './valueType'

export type BranchMeta = {
  branchId: string
  branchName: string
  equipmentTypes: EquipmentTypeMeta[]
}

export type EquipmentTypeMeta = {
  equipmentTypeId: string
  equipmentTypeName: string
  parameters: ParameterMeta[]
  tests: TestMeta[]
}

export type ParameterMeta = {
  parameterId: string
  parameterName: string
  index: number
  parameterUnit?: string | null
  valueType: ValueType
  allowedValues?: string[] | null
  maxValue?: number | null
  minValue?: number | null
}

export type TestMeta = {
  testId: string
  testName: string
  index: number
  testMethod: string
  requirements: string
}
