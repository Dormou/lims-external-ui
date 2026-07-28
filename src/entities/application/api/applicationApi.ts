import { rootApi } from '@/shared/api'
import type {
  GetAllApplicationsResponse,
  GetApplicationResponse,
} from './types/responses'
import { APPLICATION_ENDPOINTS } from './types/endpoints'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получить все заявки текущего пользователя
    getAllApplications: builder.query<GetAllApplicationsResponse, void>({
      query: () => APPLICATION_ENDPOINTS.getAllApplication,
    }),
    // Получить данные по заявке
    getApplication: builder.query<GetApplicationResponse, string>({
      query: (applicationId) =>
        APPLICATION_ENDPOINTS.getApplication(applicationId),
    }),
  }),
})

export const { useLazyGetApplicationQuery, useGetAllApplicationsQuery } =
  extendedApi
