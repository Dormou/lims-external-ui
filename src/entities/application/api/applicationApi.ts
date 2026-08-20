import { rootApi } from '@/shared/api'
import { APPLICATION_ENDPOINTS } from './types/endpoints'
import type { GetApplicationResponse } from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получить данные по заявке
    getApplication: builder.query<GetApplicationResponse, string>({
      query: (applicationId) =>
        APPLICATION_ENDPOINTS.getApplication(applicationId),
      providesTags: ['Applications'],
    }),
  }),
})

export const { useGetApplicationQuery } = extendedApi
