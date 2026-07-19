import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { GetProfileResponse } from '../types/responses'

export const getProfileHandler: HttpHandler = http.get<
  never,
  never,
  GetProfileResponse
>(USER_ENDPOINTS.getProfile, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetProfileResponse>({
    fullName: {
      firstName: 'Иван',
      lastName: 'Иванов',
      patronymic: null,
    },
    registrationDate: new Date().toISOString(),
    passwordChangeDate: new Date().toISOString(),
    email: 'admin@ntc-power.ru',
    phoneNumber: null,
    iAmTechContact: false,
    iAmHead: true,
    organizationFullName: 'Организация Иванова',
    organizationShortName: null,
    organizationLegalAddress: null,
    organizationPostalAddress: null,
    innKpp: '11111111/222222222',
    ogrn: null,
    organizationEmail: null,
    organizationPhoneNumber: null,
    headFirstName: 'Иван',
    headLastName: 'Иванов',
    headPatronymic: null,
    headPosition: null,
    headDocument: null,
    techContactFirstName: null,
    techContactLastName: null,
    techContactPatronymic: null,
    techContactEmail: null,
    techContactPhoneNumber: null,
  })
})
