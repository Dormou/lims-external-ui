// import { http, HttpHandler, HttpResponse } from 'msw'
// import type { GetClientConfirmedResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'clients/confirmed'

// export const getClientConfirmedHandler: HttpHandler = http.get<never, never, GetClientConfirmedResponse>(ENDPOINT_URL, async () => {
//   setTimeout(() => undefined, 1000)

//   return HttpResponse.json<GetClientConfirmedResponse>({
//     confirmed: true
//   })
// })