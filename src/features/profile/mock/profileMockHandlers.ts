import { changePasswordHandler } from './endpoints/changePassword'
import { getProfileHandler } from './endpoints/getProfile'
import { updateHeadHandler } from './endpoints/updateHead'
import { updateOrganizationHandler } from './endpoints/updateOrganization'
import { updateTechContactHandler } from './endpoints/updateTechContact'
import { updateUserHandler } from './endpoints/updateUser'

export const profileMockHandlers = [
  changePasswordHandler,
  getProfileHandler,
  updateHeadHandler,
  updateOrganizationHandler,
  updateTechContactHandler,
  updateUserHandler
]