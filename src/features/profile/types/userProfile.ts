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
  headFirstName: string
  headLastName: string
  headPatronymic: string | null
  headPosition: string | null
  headDocument: string | null
  techContactFirstName: string | null
  techContactLastName: string | null
  techContactPantronymic: string | null
  techContactEmail: string | null
  techContactPhoneNumber: string | null
}