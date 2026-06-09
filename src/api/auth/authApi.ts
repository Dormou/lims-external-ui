import { baseQueryWithReauth } from '../../api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { 
  ChangePasswordRequest,
  LoginRequest, 
  RecoverPasswordRequest,
  SetupPasswordRequest
} from './types/requests'

import type { 
  ChangePasswordResponse,
  LoginResponse,
  SetupPasswordResponse, 
} from './types/responses'
import { authSlice } from '../../features/auth/authStore'

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
         }),
         async onQueryStarted( _, { dispatch, queryFulfilled }) {
          try { await queryFulfilled } catch {}
          finally {
            dispatch(authSlice.actions.logout())
          }
        },
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
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useSetupPasswordMutation,
  useChangePasswordMutation
} = authApi
