import type { DraftForm } from '../../model/draftSchema'

export type UploadSignedFileRequest = {
  applicationId: string
  signedFile: File
}

export type SaveDraftRequest = {
  id: string
  draft: DraftForm
}

export type UploadRegulatoryDocumentRequest = {
  id: string
  regulatoryDocument: File
}

export type UploadAdditionalDocumentsRequest = {
  id: string
  additionalDocuments: File[]
}
