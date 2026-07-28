import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { UpdateOrganizationRequest } from '../types/requests'

export const updateOrganizationHandler: HttpHandler = http.put<
  never,
  UpdateOrganizationRequest,
  never
>(USER_ENDPOINTS.updateOrganization, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
