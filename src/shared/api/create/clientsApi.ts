import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: () => ({}),
})
