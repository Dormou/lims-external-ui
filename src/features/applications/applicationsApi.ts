import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../api/baseQuery'

import type { 
  CreateDraftResponse,
  GetAllApplicationsResponse,
  GenerateApplicationResponse,
  DownloadApplicationFileResponse,
  UploadSignedFileResponse,
  DownloadSignedFileResponse,
  GetApplicationResponse,
  GetMetadataResponse,
  GetClientConfirmedResponse
} from './types/Responses'

import type {
  CreateDraftRequest,
  SaveDraftRequest,
  UploadSignedFileRequest,
} from './types/Requests'

export const applicationsApi = createApi({
  reducerPath: 'applications',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => {
    return ({
      // Получить справочную информацию для заявки
      getMetadata: builder.query<GetMetadataResponse, void>({
        query: () => 'references/application-info'
      }),
      // Узнать подтвержденность заявителя (используется для заявки)
      getClientConfirmed: builder.query<GetClientConfirmedResponse, void>({
        query: () => 'clients/confirmed'
      }),
      // Получить все заявки текущего пользователя
      getAllApplications: builder.query<GetAllApplicationsResponse, void>({
        query: () => 'applications'
      }),
      // Получить данные по заявке
      getApplication: builder.query<GetApplicationResponse, string>({
        query: (applicationId) => `applications/${applicationId}`
      }),
      // Создать черновик заявки
      createDraft: builder.mutation<CreateDraftResponse, CreateDraftRequest>({
        query: data => ({
          url: `applications`,
          method: 'POST',
          body: data
        })
      }),
      // Сохранить черновик заявки
      saveDraft: builder.mutation<void, SaveDraftRequest>({
        query: data => ({
          url: `applications/${data.id}`,
          method: 'PUT',
          body: data
        })
      }),
      // Сформировать заявку
      generateApplication: builder.mutation<GenerateApplicationResponse, string>({
        query: (applicationId) => ({
          url: `applications/${applicationId}/form-file`,
          method: 'POST'
        })
      }),
      // Скачать сформированную заявку
      downloadApplicationFile: builder.mutation<DownloadApplicationFileResponse, string>({
        query: (applicationId) => `applications/${applicationId}/raw-file`
      }),
      // Отправить подписанную заявку
      uploadSignedFile: builder.mutation<UploadSignedFileResponse, UploadSignedFileRequest>({
        query: data => ({
          url: `applications/${data.applicationId}/signed-file`,
          method: 'POST',
          body: data
        })
      }),
      // Скачать подписанную заявку
      downloadSignedFile: builder.mutation<DownloadSignedFileResponse, string>({
        query: (applicationId) => `applications/${applicationId}/signed-file`
      })
    })
  }
})

export const {
  useGetMetadataQuery,
  useCreateDraftMutation,
  useSaveDraftMutation,
  useGenerateApplicationMutation,
  useUploadSignedFileMutation,
  useGetAllApplicationsQuery,
  useLazyGetApplicationQuery,
  useLazyGetClientConfirmedQuery,
  useDownloadApplicationFileMutation,
  useDownloadSignedFileMutation
} = applicationsApi