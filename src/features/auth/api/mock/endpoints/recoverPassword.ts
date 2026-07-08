import { http, HttpHandler, HttpResponse } from 'msw'
import type { RecoverPasswordRequest } from '../../../../../api/auth/types/requests'

const ENDPOINT_URL = 'auth/recover-password'

export const recoverPasswordHandler: HttpHandler = http.post<
  never,
  RecoverPasswordRequest,
  never
>(ENDPOINT_URL, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    return HttpResponse.json(undefined, { status: 204 })
  } catch (error) {
    return HttpResponse.json(undefined, { status: 400 })
  }
})
