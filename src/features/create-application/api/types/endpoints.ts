export const CREATE_APPLICATION_ENDPOINTS = {
  createDraft: '/applications',
  saveDraft: (applicationId: string) => `/applications/${applicationId}`,
  //!!! Заполнить
  uploadRegulatoryFile: (applicationId: string) => ``,
  uploadAdditionalDocuments: (applicationId: string) => ``,
  generateApplication: (applicationId: string) =>
    `/applications/${applicationId}/form-file`,
  downloadApplicationFile: (applicationId: string) =>
    `/applications/${applicationId}/raw-file`,
  uploadSignedFile: (applicationId: string) =>
    `/applications/${applicationId}/signed-file`,
  downloadSignedFile: (applicationId: string) =>
    `/applications/${applicationId}/signed-file`,
}
