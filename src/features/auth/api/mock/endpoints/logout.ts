import { http, HttpHandler, HttpResponse } from 'msw'

const ENDPOINT_URL = 'auth/logout'

export const logoutHandler: HttpHandler = http.post(ENDPOINT_URL, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
