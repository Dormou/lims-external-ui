import { getProfileHandler } from './endpoints/getProfile'
import { registerClientHandler } from './endpoints/registerClient'
import { updateHeadHandler } from './endpoints/updateHead'
import { updateOrganizationHandler } from './endpoints/updateOrganization'
import { updateTechContactHandler } from './endpoints/updateTechContact'
import { updateUserHandler } from './endpoints/updateUser'

export const clientsMockHandlers = [
  registerClientHandler,
  getProfileHandler,
  updateHeadHandler,
  updateOrganizationHandler,
  updateTechContactHandler,
  updateUserHandler,
  //getClientConfirmedHandler
]