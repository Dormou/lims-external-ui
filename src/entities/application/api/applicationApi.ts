import { rootApi } from '@/shared/api'
import { v4 as uuidV4 } from 'uuid'
import { APPLICATION_ENDPOINTS } from './types/endpoints'
import type {
  GetAllApplicationsResponse,
  GetApplicationResponse,
} from './types/responses'

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
      providesTags: ['CreateApplication'],
    }),
  }),
})

export const { useGetAllApplicationsQuery, useGetApplicationQuery } =
  extendedApi
