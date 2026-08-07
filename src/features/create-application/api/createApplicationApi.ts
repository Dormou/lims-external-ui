import { rootApi } from '@/shared/api'
import { CREATE_APPLICATION_ENDPOINTS } from './types/endpoints'
import type {
  SaveDraftRequest,
  UploadAdditionalDocumentsRequest,
  UploadRegulatoryDocumentRequest,
  UploadSignedFileRequest,
} from './types/requests'
import type {
  GetClientConfirmedResponse,
  GetMetadataResponse,
  GenerateApplicationResponse,
  DownloadApplicationFileResponse,
  UploadSignedFileResponse,
  DownloadSignedFileResponse,
} from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Узнать подтвержденность заявителя
    getClientConfirmed: builder.query<GetClientConfirmedResponse, void>({
      query: () => CREATE_APPLICATION_ENDPOINTS.getClientConfirmed,
    }),
    // Получить справочную информацию для заявки
    getMetadata: builder.query<GetMetadataResponse, void>({
      query: () => CREATE_APPLICATION_ENDPOINTS.getMetadata,
    }),
    // Создать черновик заявки
    createDraft: builder.mutation<string, void>({
      query: () => ({
        url: CREATE_APPLICATION_ENDPOINTS.createDraft,
        method: 'POST',
      }),
    }),
    // Сохранить черновик заявки
    saveDraft: builder.mutation<void, SaveDraftRequest>({
      query: (data) => {
        const formData = new FormData()

        formData.append('branchId', data.draft.branchId)
        formData.append('equipmentTypeId', data.draft.equipmentTypeId)
        formData.append('producerName', data.draft.producerName)
        formData.append('producerAddress', data.draft.producerAddress)

        const cleanSamples = data.draft.samples.map((sample) => ({
          name: sample.name,
          parameterValues: sample.parameterValues.filter(
            (param) => param.parameterValue !== ''
          ),
          testValues: sample.testValues.filter(
            (test) => test.testValue !== false
          ),
        }))

        formData.append('samples', JSON.stringify(cleanSamples))

        return {
          url: CREATE_APPLICATION_ENDPOINTS.saveDraft(data.id),
          method: 'PUT',
          body: formData,
        }
      },
    }),
    // Загрузить нормативный документ в черновике (!!!временное решение)
    uploadRegulatoryDocument: builder.mutation<
      void,
      UploadRegulatoryDocumentRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('regulatoryDocument', data.regulatoryDocument)

        return {
          url: CREATE_APPLICATION_ENDPOINTS.saveDraft(data.id),
          method: 'PATCH',
          body: formData,
        }
      },
      invalidatesTags: ['CreateApplication'],
    }),
    // Загрузить дополнительные файлы в черновике (!!!временное решение)
    uploadAdditionalDocuments: builder.mutation<
      void,
      UploadAdditionalDocumentsRequest
    >({
      query: (data) => {
        const formData = new FormData()
        data.additionalDocuments?.forEach((file: File) => {
          formData.append('additionalDocuments', file)
        })

        return {
          url: CREATE_APPLICATION_ENDPOINTS.saveDraft(data.id),
          method: 'PATCH',
          body: formData,
        }
      },
      invalidatesTags: ['CreateApplication'],
    }),
    // Сформировать заявку
    generateApplication: builder.mutation<GenerateApplicationResponse, string>({
      query: (applicationId) => ({
        url: CREATE_APPLICATION_ENDPOINTS.generateApplication(applicationId),
        method: 'POST',
      }),
      invalidatesTags: ['CreateApplication'],
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
      invalidatesTags: ['CreateApplication'],
    }),
    // Скачать подписанную заявку
    downloadSignedFile: builder.mutation<DownloadSignedFileResponse, string>({
      query: (applicationId) =>
        CREATE_APPLICATION_ENDPOINTS.downloadSignedFile(applicationId),
    }),
  }),
})

export const {
  useGetClientConfirmedQuery,
  useGetMetadataQuery,
  useCreateDraftMutation,
  useDownloadApplicationFileMutation,
  useDownloadSignedFileMutation,
  useGenerateApplicationMutation,
  useSaveDraftMutation,
  useUploadRegulatoryDocumentMutation,
  useUploadAdditionalDocumentsMutation,
  useUploadSignedFileMutation,
} = extendedApi
