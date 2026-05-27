export type LoginRequest = {
  email: string
  password: string
  userType: string
}

export type RegisterClientRequest = {
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  organizationFullName: string
  organizationShortName: string | null
  innKpp: string | null
}

export type RecoverPasswordRequest = {
  email: string
}

export type SetupPasswordRequest = {
  token: string
  password: string
}