import { setupWorker } from 'msw/browser'
import { authMockHandlers } from './features/auth/mock/authMockHandlers'
import { profileMockHandlers } from './features/profile/mock/profileMockHandlers'

export const worker = setupWorker(...authMockHandlers
  .concat(profileMockHandlers)
)