import { http, HttpHandler, HttpResponse } from 'msw'
import type { LoginResponse } from '../../types/responses'

const ENDPOINT_URL = 'auth/refresh'

export const refreshTokenHandler: HttpHandler = http.post<never, { refreshToken: string }, LoginResponse>(ENDPOINT_URL, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    if (data.refreshToken !== 'admin-refresh-token') 
      return HttpResponse.json(undefined, { status: 401 })

    return HttpResponse.json<LoginResponse>({
      accessToken: 'admin-token',
      refreshToken: 'admin-refresh-token',
      expiresInSeconds: 99999,
      userInfo: {
        id: 'admin-id',
        fullName: {
          firstName: 'Admin',
          lastName: 'User',
          patronymic: null
        }
      }
    })
  }
  catch (error) {
    HttpResponse.json(undefined, { status: 400 })
  }
})