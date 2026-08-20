import { http, HttpHandler, HttpResponse } from 'msw'
import { CREATE_APPLICATION_ENDPOINTS } from '../types/endpoints'
import { ApplicationsMockData } from '@/entities/application/api/mock/data/applications'

type PathParams = {
  id: string
}

// Сохранить черновик заявки
export const saveDraftHandler: HttpHandler = http.put<
  PathParams,
  FormData,
  never
>(
  CREATE_APPLICATION_ENDPOINTS.saveDraft(':id'),
  async ({ params, request }) => {
    const { id } = params

    if (!id) return HttpResponse.json(undefined, { status: 422 })

    setTimeout(() => undefined, 1000)

    const findApp = ApplicationsMockData.find((data) => data.id === id)

    if (!findApp) return HttpResponse.json(undefined, { status: 404 })

    const update = await request.formData()

    if (!findApp.draft) {
      findApp.draft = {
        branchId: null,
        equipmentTypeId: null,
        producerName: null,
        producerAddress: null,
        samples: [],
      }
    }

    findApp.draft.branchId = update.get('branchId') as string | null
    findApp.draft.equipmentTypeId = update.get('equipmentTypeId') as
      | string
      | null
    findApp.draft.producerName = update.get('producerName') as string | null
    findApp.draft.producerAddress = update.get('producerAddress') as
      | string
      | null

    findApp.draft.samples = JSON.parse(update.get('samples') as any)

    return HttpResponse.json(undefined, { status: 201 })
  }
)
