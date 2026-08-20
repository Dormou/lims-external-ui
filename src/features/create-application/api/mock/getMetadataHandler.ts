import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import type { GetMetadataResponse } from '../types/responses'
import type { BranchMeta } from '../../model/types/branchMeta'

// Получить данные для заполнения заявки
export const getMetadataHandler = (metadata: BranchMeta[]): HttpHandler =>
  http.get<never, never, GetMetadataResponse>(
    CREATE_APPLICATION_ENDPOINTS.getMetadata,
    async () => {
      setTimeout(() => undefined, 1000)

      return HttpResponse.json<GetMetadataResponse>(metadata)
    }
  )
