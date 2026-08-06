import type { FileMeta } from './fileMeta'

export type Application = {
  producerName: any
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
