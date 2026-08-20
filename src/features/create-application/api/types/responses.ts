import type { FileMeta } from '@/entities/application'

export type GetClientConfirmedResponse = {
  confirmed: boolean
  comment: string | null
}

export type UploadRegulatoryDocumentResponse = FileMeta

export type UploadAdditionalDocumentsResponse = FileMeta[]

export type GenerateApplicationResponse = FileMeta

export type DownloadApplicationFileResponse = File

export type UploadSignedFileResponse = FileMeta

export type DownloadSignedFileResponse = File
