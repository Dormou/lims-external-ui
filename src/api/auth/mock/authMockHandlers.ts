import { changePasswordHandler } from './endpoints/changePassword'
import { loginHandler } from './endpoints/login'
import { logoutHandler } from './endpoints/logout'
import { recoverPasswordHandler } from './endpoints/recoverPassword'
import { refreshTokenHandler } from './endpoints/refreshToken'

export const authMockHandlers = [
  loginHandler,
  logoutHandler,
  recoverPasswordHandler,
  refreshTokenHandler,
  changePasswordHandler
]