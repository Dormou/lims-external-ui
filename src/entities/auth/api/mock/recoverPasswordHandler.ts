import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'
import type { RecoverPasswordRequest } from '../types/requests'

export const recoverPasswordHandler: HttpHandler = http.post<
  never,
  RecoverPasswordRequest,
  never
>(AUTH_ENDPOINTS.recoverPassword, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    return HttpResponse.json(undefined, { status: 204 })
  } catch (error) {
    return HttpResponse.json(undefined, { status: 400 })
  }
})
