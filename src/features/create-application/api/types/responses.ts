import type { FileMeta } from '@/entities/application'
import type { BranchMeta } from '../../model/types/branchMeta'

export type GetClientConfirmedResponse = {
  confirmed: boolean
  comment: string | null
}

export type GetMetadataResponse = BranchMeta[]

export type UploadRegulatoryDocumentResponse = {
  applicationId: string
} & FileMeta

export type UploadAdditionalDocumentsResponse = {
  applicationId: string
} & FileMeta[]

export type GenerateApplicationResponse = {
  applicationId: string
} & FileMeta

export type DownloadApplicationFileResponse = File

export type UploadSignedFileResponse = {
  id: string
} & FileMeta

export type DownloadSignedFileResponse = File
