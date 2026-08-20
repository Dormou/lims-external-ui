import { rootApi } from '@/shared/api'
import { APPLICATIONS_LIST_ENDPOINTS } from './types/endpoints'
import type { GetAllApplicationsResponse } from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получить все заявки текущего пользователя
    getAllApplications: builder.query<GetAllApplicationsResponse, void>({
      query: () => APPLICATIONS_LIST_ENDPOINTS.getAllApplication,
    }),
  }),
})

export const { useGetAllApplicationsQuery } = extendedApi
