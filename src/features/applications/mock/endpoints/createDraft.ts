// import { http, HttpHandler, HttpResponse } from 'msw'
// import { v4 as uuidV4 } from 'uuid'
// import { ApplicationsData } from '../data/applicationsData'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import type { CreateDraftResponse } from '../../types/Responses'
// import type { Application } from '../../types/Types'

// const ENDPOINT_URL = 'applications'

// // Создать заявку
// export const createDraftHandler: HttpHandler = http.post<never, never, CreateDraftResponse>(ENDPOINT_URL, async () => {
//   setTimeout(() => undefined, 1000)

//   const newApplication: Application = {
//     id: uuidV4(),
//   }

//   ApplicationsData.push(newApplication)

//   ApplicationsInfoData.push({
//     id: newApplication.id as string,
//     status: 'Черновик',
//     updatedAt: new Date(),
//     samples: [],
//     equipmentType: ''
//   })

//   const response: CreateDraftResponse = {
//     id: newApplication.id as string,
//     createdAt: new Date()
//   }

//   return HttpResponse.json(response, { status: 201 })
// })