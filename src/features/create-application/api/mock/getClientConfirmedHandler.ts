import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import type { GetClientConfirmedResponse } from '../types/responses'

// Получить подтвержденность заявителя
export const getClientConfirmedHandler: HttpHandler = http.get<
  never,
  never,
  GetClientConfirmedResponse
>(CREATE_APPLICATION_ENDPOINTS.getClientConfirmed, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetClientConfirmedResponse>({
    confirmed: true,
    comment: null,
  })
})
