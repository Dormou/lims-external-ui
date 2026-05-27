export type UserProfile = {
  fullName: { firstName: string; lastName: string; patronymic: string | null }
  registrationDate: string
  passwordChangeDate: string
  email: string
  phoneNumber: string | null
  iAmTechContact: boolean
  iAmHead: boolean
  organizationFullName: string
  organizationShortName: string | null
  organizationLegalAddress: string | null
  organizationPostalAddress: string | null
  innKpp: string
  ogrn: string | null
  organizationEmail: string | null
  organizationPhoneNumber: string | null
  headFullName: {
    firstName: string
    lastName: string
    patronymic: string | null
  } | null
  headPosition: string | null
  headDocument: string | null
  techContactFullName: {
    firstName: string
    lastName: string
    patronymic: string | null
  } | null
  techContactEmail: string | null
  techContactPhoneNumber: string | null
}