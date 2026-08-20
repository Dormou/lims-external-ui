import type { ApplicationStatus } from '@/entities/application'

export type ApplicationInfo = {
  id: string
  status: ApplicationStatus
  updatedAt: string
  equipmentType: string
  samples: string[] | null
}
