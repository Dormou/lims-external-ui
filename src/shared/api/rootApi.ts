import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

export const networkHolder = {
  activeBaseQuery: fetchBaseQuery() as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
}

// Абстрактный прокси-запрос для RTK Query
const proxyBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return networkHolder.activeBaseQuery(args, api, extraOptions)
}

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: proxyBaseQuery,
  tagTypes: ['Profile'],
  endpoints: () => ({}),
})
