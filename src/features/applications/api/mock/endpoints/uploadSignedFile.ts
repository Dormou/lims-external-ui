// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsSignedFiles } from '../data/applicationsSignedFiles'
// import { ApplicationsInfoData } from '../data/applicationsInfoData'
// import type { UploadSignedFileResponse } from '../../types/Responses'
// import type { UploadSignedFileRequest } from '../../types/Requests'

// const ENDPOINT_URL = 'applications/:id/signed-file'

// // Отправить подписанную заявку
// export const uploadSignedFileHandler: HttpHandler = http.post<never, UploadSignedFileRequest, UploadSignedFileResponse>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })

//   setTimeout(() => undefined, 1000)

//   const requestData = await request.json()

//   if (!requestData || !requestData.applicationId || !requestData.signedFile)
//     return HttpResponse.json(undefined, { status: 422 })

//   // Обновление статуса заявки
//   const infoIndexToUpdate = ApplicationsInfoData.findIndex((data) => data.id === id)
//     if (infoIndexToUpdate === -1)
//       return HttpResponse.json(undefined, { status: 404 })

//   ApplicationsInfoData[infoIndexToUpdate] = {
//     ...ApplicationsInfoData[infoIndexToUpdate],
//     updatedAt: new Date(),
//     status: 'Отправлена'
//   }

//   // Создание подписанного файла
//   const newSignedFile = {
//     id: id,
//     fileName: requestData.signedFile.name,
//     fileExtension: requestData.signedFile.type.split('/')[1],
//     fileSize: requestData.signedFile.size.toString(),
//     createdAt: new Date(requestData.signedFile.lastModified)
//   }

//   ApplicationsSignedFiles.push(newSignedFile)

//   const response: UploadSignedFileResponse = newSignedFile

//   return HttpResponse.json(response, { status: 200 })
// })
