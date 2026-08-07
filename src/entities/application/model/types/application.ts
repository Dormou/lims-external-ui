import type { ApplicationDraft } from './applicationDraft'
import type { ApplicationStatus } from './applicationStatus'
import type { FileMeta } from './fileMeta'

export type Application = {
  id: string
  status: ApplicationStatus
  updatedAt: Date
  draft: ApplicationDraft | null
  regulatoryDocument: FileMeta | null
  additionalDocuments: FileMeta[] | null
  rawFile: FileMeta | null
  signedFile: FileMeta | null
}
