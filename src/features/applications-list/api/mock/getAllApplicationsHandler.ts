import { http, HttpHandler, HttpResponse } from 'msw'
import { APPLICATIONS_LIST_ENDPOINTS } from '../types/endpoints'
import type { GetAllApplicationsResponse } from '../types/responses'
import type { BranchMeta } from '@/entities/metadata'
import type { Application } from '@/entities/application'

// Получить все заявки текущего пользователя
export const getAllApplicationsHandler = (
  applications: Application[],
  metadata: BranchMeta[]
): HttpHandler =>
  http.get<never, never, GetAllApplicationsResponse>(
    APPLICATIONS_LIST_ENDPOINTS.getAllApplication,
    async () => {
      setTimeout(() => undefined, 1000)

      return HttpResponse.json<GetAllApplicationsResponse>(
        applications.map((app) => {
          let equipmentType: string = 'Тип оборудования не указан'

          if (app.draft?.branchId && app.draft.equipmentTypeId) {
            const findEq = metadata
              .find((branch) => branch.branchId === app.draft?.branchId)
              ?.equipmentTypes.find(
                (eq) => eq.equipmentTypeId === app.draft?.equipmentTypeId
              )

            if (findEq) equipmentType = findEq.equipmentTypeName
          }

          return {
            id: app.id,
            status: app.status,
            updatedAt: app.updatedAt,
            equipmentType: equipmentType,
            samples:
              app.draft?.samples.map((sample) => sample.name ?? '') ?? null,
          }
        })
      )
    }
  )
