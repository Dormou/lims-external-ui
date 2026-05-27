// import { http, HttpHandler, HttpResponse } from 'msw'
// import { ApplicationsSignedFiles } from '../data/applicationsSignedFiles'
// import type { DownloadSignedFileResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'applications/:id/signed-file'

// // Скачать подписанную заявку
// export const downloadSignedFileHandler: HttpHandler = http.get<never, never, DownloadSignedFileResponse>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })
  
//   setTimeout(() => undefined, 1000)

//   const signedFile = ApplicationsSignedFiles.find((file) => file.id === id)

//   if (!signedFile)
//     return HttpResponse.json(undefined, { status: 404 })

//   return HttpResponse.json(new File([], `${signedFile.fileName}${signedFile.fileExtension}`), { status: 200 })
// })