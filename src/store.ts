import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

import { authApi } from './features/auth/authApi'
import { profileApi } from './features/profile/profileApi'
import { applicationsApi } from './features/applications/applicationsApi'

import appSlice from './AppStore'
import authSlice from './features/auth/authStore'
import applicationsSlice from './features/applications/applicationStore'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  appSlice,
  authSlice,
  applicationsSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat([
      authApi.middleware,
      profileApi.middleware,
      applicationsApi.middleware,
    ])
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector