import { http, HttpHandler, HttpResponse } from 'msw'
import { v4 as uuidV4 } from 'uuid'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import { ApplicationsMockData } from '@/entities/application/api/mock/data/applications'
import type { Application } from '@/entities/application'

// Создать заявку
export const createDraftHandler: HttpHandler = http.post<never, never, string>(
  CREATE_APPLICATION_ENDPOINTS.createDraft,
  async () => {
    setTimeout(() => undefined, 1000)

    const newApplication: Application = {
      id: uuidV4(),
      status: 'Черновик',
      updatedAt: new Date(),
      draft: null,
      regulatoryDocument: null,
      additionalDocuments: null,
      rawFile: null,
      signedFile: null,
    }

    ApplicationsMockData.push(newApplication)

    return HttpResponse.json<string>(newApplication.id)
  }
)
