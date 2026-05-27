import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo } from './types/userInfo'
import type { LoginResponse } from './types/responses'

interface AuthSliceState {
  accessToken: string | null
  refreshToken: string | null
  user: UserInfo | null
}

const initialState: AuthSliceState = {
  accessToken: null,
  refreshToken: null,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.userInfo
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    }
  }
})

export default authSlice.reducer
