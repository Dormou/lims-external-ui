import { baseQueryWithReauth } from '../baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

import type {
  GetClientConfirmedResponse,
  GetProfileResponse,
} from './types/responses'

import type {
  RegisterClientRequest,
  UpdateHeadRequest,
  UpdateOrganizationRequest,
  UpdateTechContactRequest,
  UpdateUserRequest,
} from './types/requests'

export const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (builder) => {
    return {
      registerClient: builder.mutation<void, RegisterClientRequest>({
        query: (data) => ({
          url: '/clients',
          method: 'POST',
          body: data,
        }),
      }),
      getProfile: builder.query<GetProfileResponse, void>({
        query: () => ({ url: '/clients/me' }),
        providesTags: ['Profile'],
      }),
      updateUser: builder.mutation<void, UpdateUserRequest>({
        query: (data) => ({
          url: '/clients/me',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      updateOrganization: builder.mutation<void, UpdateOrganizationRequest>({
        query: (data) => ({
          url: '/clients/me/organization',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      updateHead: builder.mutation<void, UpdateHeadRequest>({
        query: (data) => ({
          url: '/clients/me/head',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      updateTechContact: builder.mutation<void, UpdateTechContactRequest>({
        query: (data) => ({
          url: '/clients/me/tech-contact',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      // Узнать подтвержденность заявителя (используется для заявки)
      getClientConfirmed: builder.query<GetClientConfirmedResponse, void>({
        query: () => 'clients/confirmed',
      }),
    }
  },
})

export const {
  useRegisterClientMutation,
  useGetProfileQuery,
  useUpdateHeadMutation,
  useUpdateTechContactMutation,
  useUpdateUserMutation,
  useUpdateOrganizationMutation,
  useLazyGetClientConfirmedQuery,
} = clientsApi
