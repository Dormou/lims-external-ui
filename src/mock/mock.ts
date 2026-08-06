import { setupWorker } from 'msw/browser'
import {
  loginHandler,
  logoutHandler,
  recoverPasswordHandler,
  setupPasswordHandler,
  changePasswordHandler,
} from '@/entities/auth'
import {
  registerUserHandler,
  getProfileHandler,
  updateHeadHandler,
  updateOrganizationHandler,
  updateTechContactHandler,
  updateUserHandler,
} from '@/entities/user'

import { getClientConfirmedHandler } from '@/temp/mock/getClientConfirmedHandler'

export const worker = setupWorker(
  ...[
    loginHandler,
    logoutHandler,
    recoverPasswordHandler,
    registerUserHandler,
    setupPasswordHandler,
    changePasswordHandler,
    getProfileHandler,
    updateHeadHandler,
    updateOrganizationHandler,
    updateTechContactHandler,
    updateUserHandler,
    getClientConfirmedHandler,
  ]
)
