import { setupWorker } from 'msw/browser'

import { ApplicationsMockData } from './data/applications'
import { MetadataMock } from './data/metadata'

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
  getUserConfirmedHandler,
} from '@/entities/user'

import { getApplicationHandler } from '@/entities/application'

import { getMetadataHandler } from '@/entities/metadata'

import {
  createDraftHandler,
  generateApplicationHandler,
  saveDraftHandler,
  uploadSignedFileHandler,
} from '@/features/create-application'

import { getAllApplicationsHandler } from '@/features/applications-list'

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
    getUserConfirmedHandler,
    getApplicationHandler(ApplicationsMockData),
    getAllApplicationsHandler(ApplicationsMockData, MetadataMock),
    getMetadataHandler(MetadataMock),
    createDraftHandler(ApplicationsMockData),
    saveDraftHandler(ApplicationsMockData),
    generateApplicationHandler(ApplicationsMockData),
    uploadSignedFileHandler(ApplicationsMockData),
  ]
)
