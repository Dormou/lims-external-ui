import { baseQueryWithReauth } from '../../api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { 
  ChangePasswordResponse, 
  GetProfileResponse 
} from './types/responses'

import type { 
  ChangePasswordRequest,
  UpdateHeadRequest, 
  UpdateOrganizationRequest, 
  UpdateTechContactRequest, 
  UpdateUserRequest 
} from './types/requests'

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: builder => {
    return ({
      getProfile: builder.query<GetProfileResponse, void>({
        query: () => ({ url: '/clients/me' }),
        providesTags: ['Profile']
      }),
      updateUser: builder.mutation<void, UpdateUserRequest>({
        query: data => ({ 
          url: '/clients/me', 
          method: 'PUT', 
          body: data 
        }),
        invalidatesTags: ['Profile']
      }),
      updateOrganization: builder.mutation<void, UpdateOrganizationRequest>({
        query: data => ({ 
          url: '/clients/me/organization',
          method: 'PUT', 
          body: data 
        }),
        invalidatesTags: ['Profile']
      }),
      updateHead: builder.mutation<void, UpdateHeadRequest>({
        query: data => ({ 
          url: '/clients/me/head',
          method: 'PUT', 
          body: data 
        }),
        invalidatesTags: ['Profile']
      }),
      updateTechContact: builder.mutation<void, UpdateTechContactRequest>({
        query: data => ({ 
          url: '/clients/me/tech-contact',
          method: 'PUT', 
          body: data 
        }),
        invalidatesTags: ['Profile']
      }),
      changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
        query: data => ({ 
          url: '/auth/change-password',
          method: 'POST', 
          body: data
        })
      })
    })
  }
})

export const {
  useGetProfileQuery,
  useUpdateHeadMutation,
  useUpdateTechContactMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
  useUpdateOrganizationMutation
} = profileApi
