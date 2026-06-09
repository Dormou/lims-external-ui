// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import { ApplicationsFiles } from '../data/applicationsFiles'
// import { ApplicationsData } from '../data/applicationsData'
// import type { GetApplicationResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'applications/:id'

// // Получить данные по заявке
// export const getApplicationHandler: HttpHandler = http.get<never, never, GetApplicationResponse>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })

//   setTimeout(() => undefined, 1000)

//   const infoData = ApplicationsInfoData.find((data) => data.id === id)

//   if (!infoData)
//     return HttpResponse.json(undefined, { status: 404 })

//   if (infoData.status !== 'Черновик') {
//     const applicationFile = ApplicationsFiles.find((file) => file.id === id)
//     if (!applicationFile)
//       return HttpResponse.json(undefined, { status: 404 })

//     return HttpResponse.json<GetApplicationResponse>({
//       id: infoData.id,
//       status: infoData.status,
//       updatedAt: infoData.updatedAt,
//       applicationInfo: applicationFile
//     })
//   }
//   else {
//     const application = ApplicationsData.find((data) => data.id === id)
//     if (!application)
//       return HttpResponse.json(undefined, { status: 404 })

//     return HttpResponse.json<GetApplicationResponse>({
//       id: infoData.id,
//       status: infoData.status,
//       updatedAt: infoData.updatedAt,
//       applicationInfo: application
//     })
//   }
// })