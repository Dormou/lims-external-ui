import { http, HttpHandler, HttpResponse } from 'msw'
import { v4 as uuidV4 } from 'uuid'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import type { Application } from '@/entities/application'

// Создать заявку
export const createDraftHandler = (applications: Application[]): HttpHandler =>
  http.post<never, never, string>(
    CREATE_APPLICATION_ENDPOINTS.createDraft,
    async () => {
      setTimeout(() => undefined, 1000)

      const newApplication: Application = {
        id: uuidV4(),
        status: 'Черновик',
        updatedAt: new Date().toISOString(),
        draft: null,
        regulatoryDocument: null,
        additionalDocuments: null,
        rawFile: null,
        signedFile: null,
      }

      applications.push(newApplication)

      return HttpResponse.json<string>(newApplication.id)
    }
  )
