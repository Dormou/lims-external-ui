import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { UpdateHeadRequest } from '../types/requests'

export const updateHeadHandler: HttpHandler = http.put<
  never,
  UpdateHeadRequest,
  never
>(USER_ENDPOINTS.updateHead, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
