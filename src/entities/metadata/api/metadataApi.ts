import { rootApi } from '@/shared/api'
import { METADATA_ENDPOINTS } from './types/endpoints'
import type { GetMetadataResponse } from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получить справочную информацию для заявки
    getMetadata: builder.query<GetMetadataResponse, void>({
      query: () => METADATA_ENDPOINTS.getMetadata,
    }),
  }),
})

export const { useGetMetadataQuery } = extendedApi
