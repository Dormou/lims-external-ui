// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import type { GetAllApplicationsResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'applications'

// // Получить все заявки текущего пользователя
// export const getAllApplicationsHandler: HttpHandler = http.get<never, never, GetAllApplicationsResponse>(ENDPOINT_URL, async () => {
//   setTimeout(() => undefined, 1000)

//   const response: GetAllApplicationsResponse = ApplicationsInfoData

//   return HttpResponse.json(response, { status: 200 })
// })