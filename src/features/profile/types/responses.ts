import type { UserInfo } from '../../auth/types/userInfo'
import type { UserProfile } from './userProfile'

export type GetProfileResponse = UserProfile

export type ChangePasswordResponse = {
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  userInfo: UserInfo
}