export type LoginRequest = {
  email: string
  password: string
  userType: string
}

export type RecoverPasswordRequest = {
  email: string
}

export type SetupPasswordRequest = {
  token: string
  password: string
}

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}