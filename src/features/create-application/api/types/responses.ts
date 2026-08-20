import type { FileMeta } from '@/entities/application'
import type { BranchMeta } from '../../model/types/branchMeta'

export type GetClientConfirmedResponse = {
  confirmed: boolean
  comment: string | null
}

export type GetMetadataResponse = BranchMeta[]

export type UploadRegulatoryDocumentResponse = FileMeta

export type UploadAdditionalDocumentsResponse = FileMeta[]

export type GenerateApplicationResponse = FileMeta

export type DownloadApplicationFileResponse = File

export type UploadSignedFileResponse = FileMeta

export type DownloadSignedFileResponse = File
