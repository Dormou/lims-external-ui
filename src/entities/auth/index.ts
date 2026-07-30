export type { UserInfo } from './model/types/userInfo'
export type { RefreshTokenResponse } from './api/types/responses'

export { authSlice } from './model/authSlice'
export { login, logout, setAuth, setFullName } from './model/authSlice'

export {
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useChangePasswordMutation,
  useSetupPasswordMutation,
} from './api/authApi'

export { loginHandler } from './api/mock/loginHandler'
export { logoutHandler } from './api/mock/logoutHandler'
export { recoverPasswordHandler } from './api/mock/recoverPasswordHandler'
export { changePasswordHandler } from './api/mock/changePasswordHandler'
export { setupPasswordHandler } from './api/mock/setupPasswordHandler'
