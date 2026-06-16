import { http, HttpHandler, HttpResponse } from 'msw'
import type { UpdateHeadRequest } from '../../types/requests'

const ENDPOINT_URL = 'clients/head'

export const updateHeadHandler: HttpHandler = http.put<
  never,
  UpdateHeadRequest,
  never
>(ENDPOINT_URL, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
