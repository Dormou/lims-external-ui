// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsFiles } from '../data/applicationsFiles'
// import { ApplicationsData } from '../data/applicationsData'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import { ReferencesEquipmentTypes } from '../data/referencesData'
// import type { GenerateApplicationResponse } from '../../types/Responses'
// import type { GenerateApplicationRequest } from '../../types/Requests'

// const ENDPOINT_URL = 'applications/:id/form-file'

// // Сформировать заявку
// export const generateApplicationHandler: HttpHandler = http.post<never, GenerateApplicationRequest, GenerateApplicationResponse>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })

//   const application = await request.json()

//   // Валидация заявки
//   if (!application)
//     return HttpResponse.json(undefined, { status: 422 })

//   if (
//     !application.branchId ||
//     !application.equipmentTypeId ||
//     !application.producerName ||
//     !application.producerAddress ||
//     !application.samples ||
//     !application.parameters ||
//     !application.tests ||
//     !application.specificationDocument ||
//     !application.shemaDocument ||
//     !application.regulatoryDocument
//   )
//     return HttpResponse.json(undefined, { status: 422 })

//   setTimeout(() => undefined, 1000)

//   // Индексы для обновления информации
//   const dataIndexToUpdate = ApplicationsData.findIndex((data) => data.id === id)
//     if (dataIndexToUpdate === -1)
//       return HttpResponse.json(undefined, { status: 404 })

//   const infoIndexToUpdate = ApplicationsInfoData.findIndex((data) => data.id === id)
//     if (infoIndexToUpdate === -1)
//       return HttpResponse.json(undefined, { status: 404 })

//   // Обновление информации о заявке со сменой статуса
//   ApplicationsData[dataIndexToUpdate] = application
//   ApplicationsInfoData[infoIndexToUpdate] = {
//     ...ApplicationsInfoData[infoIndexToUpdate],
//     updatedAt: new Date(),
//     status: 'Сформирована',
//     equipmentType: ReferencesEquipmentTypes.find((type) => type.equipmentTypeId === application.equipmentTypeId)?.equipmentTypeName ?? '',
//     samples: application.samples as string[]
//   }

//   // Создание файла
//   const newFile = {
//     id: id,
//     fileName: `Заявка на испытания от ${application.producerName} от ${new Date().toLocaleDateString()}`,
//     fileExtension: '.pdf',
//     fileSize: '5.2KB',
//     createdAt: new Date()
//   }

//   ApplicationsFiles.push(newFile)

//   const response: GenerateApplicationResponse = {
//     ...newFile,
//     applicationId: id
//   }

//   return HttpResponse.json(response, { status: 200 })
// })
