import type { Application } from '../../model/types/application'
import type { ApplicationInfo } from '../../model/types/applicationInfo'
import type { FileMeta } from '../../model/types/fileMeta'

export type GetAllApplicationsResponse = ApplicationInfo[]

export type GetApplicationResponse = {
  id: string
  status: string
  updatedAt: string
} & (Application | FileMeta)
