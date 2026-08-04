import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi } from '@/shared/api'
import { clientsApi } from '@/shared/api'
import { applicationsApi } from '@/shared/api'
import { referencesApi } from '@/shared/api'

import { authSlice } from '@/entities/auth'
import { createApplicationSlice } from '@/features/create-application-form'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [referencesApi.reducerPath]: referencesApi.reducer,
  auth: authSlice.reducer,
  createApplication: createApplicationSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      clientsApi.middleware,
      applicationsApi.middleware,
      referencesApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
