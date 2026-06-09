import { http, HttpHandler, HttpResponse } from 'msw'
import type { UpdateOrganizationRequest } from '../../types/requests'

const ENDPOINT_URL = 'clients/organization'

export const updateOrganizationHandler: HttpHandler = http.put<never, UpdateOrganizationRequest, never>(ENDPOINT_URL, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204} )
})