export type ApplicationStatus = 'Черновик' | 'Сформирована' | 'Отправлена'

export type ValueType = 
  | 'Integer' | 'Decimal' | 'String' 
  | 'IntegerList' | 'DecimalList' | 'StringList' 
  | 'Constant'

export type ApplicationInfo = {
  id: string
  status: ApplicationStatus
  updatedAt: Date
  equipmentType: string
  samples: string[]
}

export type TestingObject = {
  id: string
  name: string
}

export type FileMeta = {
  applicationId: string
  fileName: string
  fileExtension: string
  fileSize: string
  createdAt: string
}

export type Application = {
  id: string
  status: string
  updatedAt: string
  draft: {
    branchId: string | null
    equipmentTypeId: string | null
    producerName: string | null
    producerAddress: string | null
    samples: any[]
  }
  regulatoryDocument: FileMeta | null
  specification: FileMeta | null
  shema: FileMeta | null
  additionalDocuments: FileMeta[]
  rawFile: FileMeta | null
  signedFile: FileMeta | null
}

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
  allowedValues?: string[]
  maxValue?: string | null
  minValue?: string | null
}

export type TestMeta = {
  testId: string
  testName: string
  index: number
  testMethod: string
  requirements: string
}
