import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import appSlice from './AppStore'

import { authApi } from './features/auth/api/authApi'
import { applicationsApi } from './features/applications/api/applicationsApi'
import { referencesApi } from './entities/reference/api/referencesApi'
import { clientsApi } from './entities/clients/api/clientsApi'

import authSlice from './features/auth/authStore'
import applicationsSlice from './features/applications/applicationStore'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [referencesApi.reducerPath]: referencesApi.reducer,
  appSlice,
  authSlice,
  applicationsSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      clientsApi.middleware,
      applicationsApi.middleware,
      referencesApi.middleware,
    ])
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
