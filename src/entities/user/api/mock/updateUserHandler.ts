import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { UpdateUserRequest } from '../types/requests'

export const updateUserHandler: HttpHandler = http.put<
  never,
  UpdateUserRequest,
  never
>(USER_ENDPOINTS.updateUser, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json(undefined, { status: 204 })
})
