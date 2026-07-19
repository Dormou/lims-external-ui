import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createBaseQueryWithReauth, networkHolder, rootApi } from '@/shared/api'

import { authSlice } from '@/entities/auth'
import { createApplicationSlice } from '@/features/create-application'

const realBaseQuery = createBaseQueryWithReauth({
  baseUrl:
    import.meta.env.VITE_ENABLE_MOCK === 'true'
      ? `http://localhost:${import.meta.env.VITE_SERVER_PORT}`
      : '/api',
  refreshUrl: '/auth/refresh',
  getToken: (state: RootState) => state.auth.accessToken,
  getRefreshToken: (state: RootState) => state.auth.refreshToken,
  onRefreshSuccess: (data) => authSlice.actions.setAuth(data),
  onRefreshApiError: () => authSlice.actions.logout(),
})

networkHolder.activeBaseQuery = realBaseQuery

const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  auth: authSlice.reducer,
  createApplication: createApplicationSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rootApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
