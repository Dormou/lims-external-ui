import type { Application } from './Types'

export type SaveDraftRequest = any

export type GetApplicationRequest = {
  applicationId: string
}

export type UploadSignedFileRequest = {
  applicationId: string
  signedFile: File
}