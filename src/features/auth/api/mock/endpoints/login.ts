import { http, HttpHandler, HttpResponse } from 'msw'
import type { LoginRequest } from '../../../../../api/auth/types/requests'
import type { LoginResponse } from '../../../../../api/auth/types/responses'

const ENDPOINT_URL = 'auth/login'

export const loginHandler: HttpHandler = http.post<
  never,
  LoginRequest,
  LoginResponse
>(ENDPOINT_URL, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    if (data.email !== 'admin@ntc-power.ru' || data.password !== 'test1234')
      return HttpResponse.json(undefined, { status: 401 })

    return HttpResponse.json<LoginResponse>({
      accessToken: 'admin-token',
      refreshToken: 'admin-refresh-token',
      expiresInSeconds: 99999,
      userInfo: {
        id: 'admin-id',
        fullName: {
          firstName: 'Иван',
          lastName: 'Иванов',
          patronymic: null,
        },
      },
    })
  } catch (error) {
    HttpResponse.json(undefined, { status: 400 })
  }
})
