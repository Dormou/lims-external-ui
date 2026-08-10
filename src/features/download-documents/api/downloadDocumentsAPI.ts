import { rootApi } from '@/shared/api/rootApi'
import type { DownloadArchiveRequest } from './types/requests'
import { DOCUMENTS_ARCHIVE_ENDPOINTS } from './types/endpoints'

const documentsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadDocumentsArchive: builder.mutation<Blob, DownloadArchiveRequest>({
      queryFn: async ({ applicationId, password }) => {
        const response = await fetch(
          DOCUMENTS_ARCHIVE_ENDPOINTS.downloadArchive(applicationId),
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
          }
        )
        const blob = await response.blob()
        return { data: blob }
      },
    }),
  }),
})

export const { useDownloadDocumentsArchiveMutation } = documentsApi