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

import {
  getAllApplicationsHandler,
  getApplicationHandler,
} from '@/entities/application'

import {
  createDraftHandler,
  generateApplicationHandler,
  getClientConfirmedHandler,
  getMetadataHandler,
  saveDraftHandler,
  uploadSignedFileHandler,
} from '@/features/create-application'

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
    getApplicationHandler,
    getAllApplicationsHandler,
    getClientConfirmedHandler,
    getMetadataHandler,
    createDraftHandler,
    saveDraftHandler,
    generateApplicationHandler,
    uploadSignedFileHandler,
  ]
)
