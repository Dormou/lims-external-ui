import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQuery'

export const referencesApi = createApi({
  reducerPath: 'referencesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
