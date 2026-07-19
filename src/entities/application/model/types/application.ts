import type { FileMeta } from './fileMeta'

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
