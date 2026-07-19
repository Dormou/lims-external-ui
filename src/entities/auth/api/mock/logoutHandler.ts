import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'

export const logoutHandler: HttpHandler = http.post(
  AUTH_ENDPOINTS.logout,
  async () => {
    setTimeout(() => undefined, 1000)

    return HttpResponse.json(undefined, { status: 204 })
  }
)
