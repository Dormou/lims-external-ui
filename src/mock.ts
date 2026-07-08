import { setupWorker } from 'msw/browser'
import { authMockHandlers } from './features/auth/api/mock/authMockHandlers'
import { clientsMockHandlers } from './api/clients/mock/clientsMockHandlers'

export const worker = setupWorker(
  ...authMockHandlers.concat(clientsMockHandlers)
)
