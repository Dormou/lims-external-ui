import { http, HttpHandler, HttpResponse } from 'msw'
import type { UpdateUserRequest } from '../../types/requests'

const ENDPOINT_URL = 'clients/me'

export const updateUserHandler: HttpHandler = http.put<never, UpdateUserRequest, never>(ENDPOINT_URL, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204} )
})