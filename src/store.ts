import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import { authApi } from './api/auth/authApi'
import { clientsApi } from './api/clients/clientsApi'
import { applicationsApi } from './api/applications/applicationsApi'
import { referencesApi } from './api/references/referencesApi'

import appSlice from './AppStore'
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
    ]),
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
