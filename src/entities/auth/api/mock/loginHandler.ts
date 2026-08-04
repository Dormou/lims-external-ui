import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'
import type { LoginRequest } from '../types/requests'
import type { LoginResponse } from '../types/responses'

export const loginHandler: HttpHandler = http.post<
  never,
  LoginRequest,
  LoginResponse
>(AUTH_ENDPOINTS.login, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    console.log('loginHandler', data)
    
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
    return HttpResponse.json(undefined, { status: 400 })
  }
})
