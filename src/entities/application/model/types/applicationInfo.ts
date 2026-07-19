import type { ApplicationStatus } from './applicationStatus'

export type ApplicationInfo = {
  id: string
  status: ApplicationStatus
  updatedAt: Date
  equipmentType: string
  samples: string[] | null
}
