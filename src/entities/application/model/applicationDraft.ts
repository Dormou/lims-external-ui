export type ApplicationDraft = {
  branchId: string | null
  equipmentTypeId: string | null
  producerName: string | null
  producerAddress: string | null
  samples: Sample[]
}

export type Sample = {
  name: string | null
  parameterValues: SampleParameter[]
  testValues: SampleTest[]
}

export type SampleParameter = {
  parameterId: string
  parameterValue: string
}

export type SampleTest = {
  testId: string
  testValue: boolean
}
