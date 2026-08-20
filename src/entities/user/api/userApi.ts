import { rootApi } from '@/shared/api'
import { USER_ENDPOINTS } from './types/endpoints'
import type {
  RegisterUserRequest,
  UpdateUserRequest,
  UpdateOrganizationRequest,
  UpdateHeadRequest,
  UpdateTechContactRequest,
} from './types/requests'
import type {
  GetUserConfirmedResponse,
  GetProfileResponse,
} from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterUserRequest>({
      query: (data) => ({
        url: USER_ENDPOINTS.registerUser,
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({ url: USER_ENDPOINTS.getProfile }),
      providesTags: ['Profile'],
    }),
    updateUser: builder.mutation<void, UpdateUserRequest>({
      query: (data) => ({
        url: USER_ENDPOINTS.updateUser,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateOrganization: builder.mutation<void, UpdateOrganizationRequest>({
      query: (data) => ({
        url: USER_ENDPOINTS.updateOrganization,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateHead: builder.mutation<void, UpdateHeadRequest>({
      query: (data) => ({
        url: USER_ENDPOINTS.updateHead,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateTechContact: builder.mutation<void, UpdateTechContactRequest>({
      query: (data) => ({
        url: USER_ENDPOINTS.updateTechContact,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    // Узнать подтвержденность заявителя
    getUserConfirmed: builder.query<GetUserConfirmedResponse, void>({
      query: () => USER_ENDPOINTS.getUserConfirmed,
    }),
  }),
})

export const {
  useGetProfileQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useUpdateOrganizationMutation,
  useUpdateHeadMutation,
  useUpdateTechContactMutation,
  useGetUserConfirmedQuery,
} = extendedApi
