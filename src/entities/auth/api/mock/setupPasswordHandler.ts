import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'
import type { SetupPasswordRequest } from '../types/requests'
import type { SetupPasswordResponse } from '../types/responses'

export const setupPasswordHandler: HttpHandler = http.post<
  never,
  SetupPasswordRequest,
  SetupPasswordResponse
>(AUTH_ENDPOINTS.setupPassword, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    if (!data.password || !data.token)
      return HttpResponse.json(undefined, { status: 401 })

    return HttpResponse.json<SetupPasswordResponse>({
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
