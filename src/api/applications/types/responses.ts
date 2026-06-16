import type { ApplicationInfo, FileMeta, Application } from './types'
import type { BranchMeta } from './types'

export type GetMetadataResponse = BranchMeta[]

export type GetAllApplicationsResponse = ApplicationInfo[]

export type GetApplicationResponse = {
  id: string
  status: string
  updatedAt: string
} & (Application | FileMeta)

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
