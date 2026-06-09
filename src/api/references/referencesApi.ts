import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

import type { GetMetadataResponse } from './types/responses'

export const referencesApi = createApi({
  reducerPath: 'references',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => {
    return ({
      // Получить справочную информацию для заявки
      getMetadata: builder.query<GetMetadataResponse, void>({
        query: () => 'references/application-info'
      })
    })
  }
})

export const {
  useGetMetadataQuery
} = referencesApi