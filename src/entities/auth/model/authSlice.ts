import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo } from './types/userInfo'

const loadUser = (): UserInfo | null => {
  try {
    const storageUser = localStorage.getItem('user_info')
    return storageUser ? JSON.parse(storageUser) : null
  } catch {
    return null
  }
}

interface AuthSliceState {
  accessToken: string | null
  refreshToken: string | null
  userInfo: UserInfo | null
}

const initialState: AuthSliceState = {
  accessToken: localStorage.getItem('access_token') ?? null,
  refreshToken: localStorage.getItem('refresh_token') ?? null,
  userInfo: loadUser(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        userInfo: UserInfo
      }>
    ) => {
      localStorage.setItem('access_token', action.payload.accessToken)
      localStorage.setItem('refresh_token', action.payload.refreshToken)
      localStorage.setItem('user_info', JSON.stringify(action.payload.userInfo))

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userInfo = action.payload.userInfo
    },
    logout: (state) => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')

      state.accessToken = null
      state.refreshToken = null
      state.userInfo = null
    },
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      localStorage.setItem('access_token', action.payload.accessToken)
      localStorage.setItem('refresh_token', action.payload.refreshToken)

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setFullName: (
      state,
      action: PayloadAction<{
        firstName: string
        lastName: string
        patronymic: string | null
      }>
    ) => {
      if (state.userInfo) {
        state.userInfo.fullName = { ...action.payload }
        localStorage.setItem('user_info', JSON.stringify(state.userInfo))
      }
    },
  },
})

export const { login, logout, setAuth, setFullName } = authSlice.actions
