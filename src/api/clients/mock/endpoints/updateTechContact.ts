import { http, HttpHandler, HttpResponse } from 'msw'
import type { UpdateTechContactRequest } from '../../types/requests'

const ENDPOINT_URL = 'clients/tech-contact'

export const updateTechContactHandler: HttpHandler = http.put<
  never,
  UpdateTechContactRequest,
  never
>(ENDPOINT_URL, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
