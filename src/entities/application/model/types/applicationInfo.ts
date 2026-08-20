import type { ApplicationStatus } from './applicationStatus'

export type ApplicationInfo = {
  id: string
  status: ApplicationStatus
  updatedAt: string
  equipmentType: string
  samples: string[] | null
}
