import { http, HttpHandler, HttpResponse } from 'msw'
import { METADATA_ENDPOINTS } from '../../api/types/endpoints'
import type { GetMetadataResponse } from '../../api/types/responses'
import type { BranchMeta } from '../../model/branchMeta'

// Получить данные для заполнения заявки
export const getMetadataHandler = (metadata: BranchMeta[]): HttpHandler =>
  http.get<never, never, GetMetadataResponse>(
    METADATA_ENDPOINTS.getMetadata,
    async () => {
      setTimeout(() => undefined, 1000)

      return HttpResponse.json<GetMetadataResponse>(metadata)
    }
  )
