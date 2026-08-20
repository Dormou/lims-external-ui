import type { UserProfile } from '../../model/types/userProfile'

export type GetProfileResponse = UserProfile

export type GetUserConfirmedResponse = {
  confirmed: boolean
  comment: string | null
}
