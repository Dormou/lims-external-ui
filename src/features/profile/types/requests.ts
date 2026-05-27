export type UpdateUserRequest = {
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  phoneNumber: string | null
  iAmTechContact: boolean
  iAmHead: boolean
}

export type UpdateOrganizationRequest = {
  organizationFullName: string
  organizationShortName: string | null
  organizationLegalAddress: string | null
  organizationPostalAddress: string | null
  innKpp: string
  ogrn: string | null
  organizationEmail: string | null
  organizationPhoneNumber: string | null
}

export type UpdateHeadRequest = {
  firstName: string | null
  lastName: string | null
  patronymic: string | null
  headPosition: string | null
  headDocument: string | null
}

export type UpdateTechContactRequest = {
  firstName: string | null
  lastName: string | null
  patronymic: string | null
  email: string | null
  phoneNumber: string | null
}

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}
