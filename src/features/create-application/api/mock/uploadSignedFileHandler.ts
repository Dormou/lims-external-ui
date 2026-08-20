import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import { formatFileSize } from '@/shared/lib'
import type { UploadSignedFileResponse } from '../types/responses'
import type { Application } from '@/entities/application'

type PathParams = {
  id: string
}

// Отправить подписанную заявку
export const uploadSignedFileHandler = (
  applications: Application[]
): HttpHandler =>
  http.post<PathParams, FormData, UploadSignedFileResponse>(
    CREATE_APPLICATION_ENDPOINTS.uploadSignedFile(':id'),
    async ({ request, params }) => {
      const { id } = params
      const fileData = (await request.formData()).get('file') as File

      if (!id || !fileData) return HttpResponse.json(undefined, { status: 422 })

      setTimeout(() => undefined, 1000)

      const findApp = applications.find((data) => data.id === id)

      if (!findApp) return HttpResponse.json(undefined, { status: 404 })

      findApp.status = 'Отправлена'
      findApp.updatedAt = new Date().toISOString()
      findApp.signedFile = {
        applicationId: id,
        fileName: fileData.name,
        fileSize: formatFileSize(fileData.size),
        fileExtension: fileData.type.split('/')[1],
        createdAt: new Date().toISOString(),
      }

      return HttpResponse.json<UploadSignedFileResponse>(findApp.signedFile)
    }
  )
