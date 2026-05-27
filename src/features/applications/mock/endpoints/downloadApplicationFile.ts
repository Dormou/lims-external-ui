// import { http, HttpHandler, HttpResponse } from 'msw'
// import type { DownloadApplicationFileResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'applications/:id/raw-file'

// // Реализовать
// export const downloadApplicationFileHandler: HttpHandler = http.get<never, never, DownloadApplicationFileResponse>(ENDPOINT_URL, async ({request}) => {
//   const id = new URL(request.url).searchParams.get('id')

//   if (!id) return HttpResponse.json(undefined, { status: 422 })
  
//   setTimeout(() => undefined, 1000)

//   return HttpResponse.json(undefined, { status: 200 })
// })