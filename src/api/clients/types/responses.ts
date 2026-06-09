import type { UserProfile } from './userProfile'

export type GetProfileResponse = UserProfile

export type GetClientConfirmedResponse = {
  confirmed: boolean
}