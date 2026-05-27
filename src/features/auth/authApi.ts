import { baseQueryWithReauth } from '../../api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { 
  LoginRequest, 
  RecoverPasswordRequest, 
  RegisterClientRequest, 
  SetupPasswordRequest
} from './types/requests'

import type { 
  LoginResponse,
  SetupPasswordResponse, 
} from './types/responses'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => {
    return ({
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: data => ({
          url: '/auth/login',
          method: 'POST',
          body: data
        })
      }),
      logout: builder.mutation<void, void>({
        query: () => ({ 
          url: '/auth/logout',
          method: 'POST'
         })
      }),
      registerClient: builder.mutation<void, RegisterClientRequest>({
        query: data => ({
          url: '/clients',
          method: 'POST',
          body: data
        })
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordRequest>({
        query: data => ({
          url: '/auth/recover-password',
          method: 'POST',
          body: data
        })
      }),
      setupPassword: builder.mutation<SetupPasswordResponse, SetupPasswordRequest>({
        query: data => ({
          url: '/auth/setup-password',
          method: 'POST',
          body: data
        })
      })
    })
  }
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterClientMutation,
  useRecoverPasswordMutation,
  useSetupPasswordMutation
} = authApi
