import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { UpdateTechContactRequest } from '../types/requests'

export const updateTechContactHandler: HttpHandler = http.put<
  never,
  UpdateTechContactRequest,
  never
>(USER_ENDPOINTS.updateTechContact, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
