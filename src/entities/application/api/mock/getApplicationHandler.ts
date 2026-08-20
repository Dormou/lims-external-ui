import { http, HttpHandler, HttpResponse } from 'msw'
import { APPLICATION_ENDPOINTS } from '../types/endpoints'
import type { GetApplicationResponse } from '../types/responses'
import type { Application } from '../../model/types/application'

type PathParams = {
  id: string
}

// Получить данные по заявке
export const getApplicationHandler = (
  applications: Application[]
): HttpHandler =>
  http.get<PathParams, never, GetApplicationResponse>(
    APPLICATION_ENDPOINTS.getApplication(':id'),
    async ({ params }) => {
      const { id } = params

      if (!id) return HttpResponse.json(undefined, { status: 422 })

      setTimeout(() => undefined, 1000)

      const findApp = applications.find((data) => data.id === id)

      if (!findApp) return HttpResponse.json(undefined, { status: 404 })

      return HttpResponse.json<GetApplicationResponse>(findApp)
    }
  )
