import type { UserInfo } from './userInfo'

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  userInfo: UserInfo
}

export type SetupPasswordResponse = {
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  userInfo: UserInfo
}