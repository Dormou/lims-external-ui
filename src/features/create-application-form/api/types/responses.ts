import type { FileMeta } from '@/entities/application'
import type { BranchMeta } from '../../model/types/branchMeta'

export type GetClientConfirmedResponse = {
  confirmed: boolean
}

export type GetMetadataResponse = BranchMeta[]

export type CreateDraftResponse = {
  id: string
  createdAt: string
}

export type GenerateApplicationResponse = {
  applicationId: string
} & FileMeta

export type DownloadApplicationFileResponse = File

export type UploadSignedFileResponse = {
  id: string
} & FileMeta

export type DownloadSignedFileResponse = File
