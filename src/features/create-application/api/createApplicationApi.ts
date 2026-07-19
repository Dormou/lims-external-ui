import { rootApi } from '@/shared/api'
import { CREATE_APPLICATION_ENDPOINTS } from './types/endpoints'
import type {
  SaveDraftRequest,
  UploadSignedFileRequest,
} from './types/requests'
import type {
  GetClientConfirmedResponse,
  GetMetadataResponse,
  CreateDraftResponse,
  GenerateApplicationResponse,
  DownloadApplicationFileResponse,
  UploadSignedFileResponse,
  DownloadSignedFileResponse,
} from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Узнать подтвержденность заявителя (используется для заявки)
    getClientConfirmed: builder.query<GetClientConfirmedResponse, void>({
      query: () => CREATE_APPLICATION_ENDPOINTS.getClientConfirmed,
    }),
    // Получить справочную информацию для заявки
    getMetadata: builder.query<GetMetadataResponse, void>({
      query: () => CREATE_APPLICATION_ENDPOINTS.getMetadata,
    }),
    // Создать черновик заявки
    createDraft: builder.mutation<CreateDraftResponse, void>({
      query: () => ({
        url: CREATE_APPLICATION_ENDPOINTS.createDraft,
        method: 'POST',
      }),
    }),
    // Сохранить черновик заявки
    saveDraft: builder.mutation<void, SaveDraftRequest>({
      query: (data) => ({
        url: CREATE_APPLICATION_ENDPOINTS.saveDraft(data.id),
        method: 'PUT',
        body: data.formData,
      }),
    }),
    // Сформировать заявку
    generateApplication: builder.mutation<GenerateApplicationResponse, string>({
      query: (applicationId) => ({
        url: CREATE_APPLICATION_ENDPOINTS.generateApplication(applicationId),
        method: 'POST',
      }),
    }),
    // Скачать сформированную заявку
    downloadApplicationFile: builder.mutation<
      DownloadApplicationFileResponse,
      string
    >({
      query: (applicationId) =>
        CREATE_APPLICATION_ENDPOINTS.downloadApplicationFile(applicationId),
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
          url: CREATE_APPLICATION_ENDPOINTS.uploadSignedFile(
            data.applicationId
          ),
          method: 'POST',
          body: formData,
        }
      },
    }),
    // Скачать подписанную заявку
    downloadSignedFile: builder.mutation<DownloadSignedFileResponse, string>({
      query: (applicationId) =>
        CREATE_APPLICATION_ENDPOINTS.downloadSignedFile(applicationId),
    }),
  }),
})

export const {
  useLazyGetClientConfirmedQuery,
  useGetMetadataQuery,
  useCreateDraftMutation,
  useDownloadApplicationFileMutation,
  useDownloadSignedFileMutation,
  useGenerateApplicationMutation,
  useSaveDraftMutation,
  useUploadSignedFileMutation,
} = extendedApi
