import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import { formatDate } from '@/shared/lib'
import type { GenerateApplicationResponse } from '../types/responses'
import type { Application } from '@/entities/application'

type PathParams = {
  id: string
}

// Сгенерировать заявку (мок без валидации)
export const generateApplicationHandler = (
  applications: Application[]
): HttpHandler =>
  http.post<PathParams, never, GenerateApplicationResponse>(
    CREATE_APPLICATION_ENDPOINTS.generateApplication(':id'),
    async ({ params }) => {
      const { id } = params

      if (!id) return HttpResponse.json(undefined, { status: 422 })

      setTimeout(() => undefined, 1000)

      const findApp = applications.find((data) => data.id === id)

      if (!findApp) return HttpResponse.json(undefined, { status: 404 })

      findApp.status = 'Сформирована'
      findApp.updatedAt = new Date().toISOString()
      findApp.rawFile = {
        applicationId: id,
        fileName: `Заявка на испытания от ${findApp.draft?.producerName} от ${formatDate(new Date().toISOString())}.docx`,
        fileSize: '20.0KB',
        fileExtension: '.docx',
        createdAt: new Date().toISOString(),
      }

      return HttpResponse.json<GenerateApplicationResponse>(findApp.rawFile)
    }
  )
