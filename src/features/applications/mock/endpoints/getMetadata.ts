// import { http, HttpHandler, HttpResponse } from 'msw'
// import { BranchesData } from '../data/referencesData'
// import type { GetMetadataResponse } from '../../types/Responses'

// const ENDPOINT_URL = 'references/application-info'

// export const getMetadataHandler: HttpHandler = http.get<never, never, GetMetadataResponse>(ENDPOINT_URL, async () => {
//   setTimeout(() => undefined, 1000)

//   return HttpResponse.json<GetMetadataResponse>(BranchesData)
// })