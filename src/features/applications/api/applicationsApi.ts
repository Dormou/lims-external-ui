import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../../shared/api/baseQuery'

import type {
  CreateDraftResponse,
  GetAllApplicationsResponse,
  GenerateApplicationResponse,
  DownloadApplicationFileResponse,
  UploadSignedFileResponse,
  DownloadSignedFileResponse,
  GetApplicationResponse,
} from './types/responses'

import type {
  SaveDraftRequest,
  UploadSignedFileRequest,
} from './types/requests'

export const applicationsApi = createApi({
  reducerPath: 'applications',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      // Получить все заявки текущего пользователя
      getAllApplications: builder.query<GetAllApplicationsResponse, void>({
        query: () => 'applications',
      }),
      // Получить данные по заявке
      getApplication: builder.query<GetApplicationResponse, string>({
        query: (applicationId) => `applications/${applicationId}`,
      }),
      // Создать черновик заявки
      createDraft: builder.mutation<CreateDraftResponse, void>({
        query: () => ({
          url: `applications`,
          method: 'POST',
        }),
      }),
      // Сохранить черновик заявки
      saveDraft: builder.mutation<void, SaveDraftRequest>({
        query: (data) => ({
          url: `applications/${data.id}`,
          method: 'PUT',
          body: data.formData,
        }),
      }),
      // Сформировать заявку
      generateApplication: builder.mutation<
        GenerateApplicationResponse,
        string
      >({
        query: (applicationId) => ({
          url: `applications/${applicationId}/form-file`,
          method: 'POST',
        }),
      }),
      // Скачать сформированную заявку
      downloadApplicationFile: builder.mutation<
        DownloadApplicationFileResponse,
        string
      >({
        query: (applicationId) => `applications/${applicationId}/raw-file`,
      }),
      // Отправить подписанную заявку
      uploadSignedFile: builder.mutation<
        UploadSignedFileResponse,
        UploadSignedFileRequest
      >({
        query: (data) => {
          const formData = new FormData()
          formData.append('file', data.signedFile)

          return {
            url: `applications/${data.applicationId}/signed-file`,
            method: 'POST',
            body: formData,
          }
        },
      }),
      // Скачать подписанную заявку
      downloadSignedFile: builder.mutation<DownloadSignedFileResponse, string>({
        query: (applicationId) => `applications/${applicationId}/signed-file`,
      }),
    }
  },
})

export const {
  useCreateDraftMutation,
  useSaveDraftMutation,
  useGenerateApplicationMutation,
  useUploadSignedFileMutation,
  useGetAllApplicationsQuery,
  useLazyGetApplicationQuery,
  useDownloadApplicationFileMutation,
  useDownloadSignedFileMutation,
} = applicationsApi
