import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { GetUserConfirmedResponse } from '../types/responses'

// Получить подтвержденность заявителя
export const getUserConfirmedHandler: HttpHandler = http.get<
  never,
  never,
  GetUserConfirmedResponse
>(USER_ENDPOINTS.getUserConfirmed, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetUserConfirmedResponse>({
    confirmed: true,
    comment: null,
  })
})
