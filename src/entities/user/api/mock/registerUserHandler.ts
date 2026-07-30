import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { RegisterUserRequest } from '../types/requests'

export const registerUserHandler: HttpHandler = http.post<
  never,
  RegisterUserRequest,
  never
>(USER_ENDPOINTS.registerUser, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    return HttpResponse.json(undefined, { status: 204 })
  } catch (error) {
    return HttpResponse.json(undefined, { status: 400 })
  }
})
