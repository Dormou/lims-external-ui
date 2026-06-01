export type SaveDraftRequest = any

export type GetApplicationRequest = {
  applicationId: string
}

export type UploadSignedFileRequest = {
  applicationId: string
  signedFile: File
}