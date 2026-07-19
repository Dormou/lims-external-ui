export type UploadSignedFileRequest = {
  applicationId: string
  signedFile: File
}

export type SaveDraftRequest = {
  id: string
  formData: any
}
