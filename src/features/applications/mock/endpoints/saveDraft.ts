// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsData } from '../data/applicationsData'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import { ReferencesEquipmentTypes } from '../data/referencesData'
// import type { SaveDraftRequest } from '../../types/Requests'

// const ENDPOINT_URL = 'applications/:id'

// // Сохранить черновик заявки
// export const saveDraftHandler: HttpHandler = http.put<never, SaveDraftRequest, never>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })
  
//   setTimeout(() => undefined, 1000)

//   const dataIndexToUpdate = ApplicationsData.findIndex((data) => data.id === id)
//   if (dataIndexToUpdate === -1)
//     return HttpResponse.json(undefined, { status: 404 })

//   const infoIndexToUpdate = ApplicationsInfoData.findIndex((data) => data.id === id)
//   if (infoIndexToUpdate === -1)
//     return HttpResponse.json(undefined, { status: 404 })

//   const updatedApplication = await request.json()

//   ApplicationsData[dataIndexToUpdate] = updatedApplication
//   ApplicationsInfoData[infoIndexToUpdate] = { 
//     ...ApplicationsInfoData[infoIndexToUpdate],
//     updatedAt: new Date(),
//     equipmentType: ReferencesEquipmentTypes.find((type) => type.equipmentTypeId === updatedApplication.equipmentTypeId)?.equipmentTypeName ?? '',
//     samples: updatedApplication.samples as string[]
//   }

//   return HttpResponse.json(undefined, { status: 200 })
// })