import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import { MetadataMock } from './data/metadata'
import type { GetMetadataResponse } from '../types/responses'

// Получить данные для заполнения заявки
export const getMetadataHandler: HttpHandler = http.get<
  never,
  never,
  GetMetadataResponse
>(CREATE_APPLICATION_ENDPOINTS.getMetadata, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetMetadataResponse>(MetadataMock)
})
