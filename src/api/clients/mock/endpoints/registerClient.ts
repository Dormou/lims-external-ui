import { http, HttpHandler, HttpResponse } from 'msw'
import type { RegisterClientRequest } from '../../types/requests'

const ENDPOINT_URL = 'clients'

export const registerClientHandler: HttpHandler = http.post<
  never,
  RegisterClientRequest,
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
