import { loginHandler } from './endpoints/login'
import { logoutHandler } from './endpoints/logout'
import { recoverPasswordHandler } from './endpoints/recoverPassword'
import { refreshTokenHandler } from './endpoints/refreshToken'
import { registerClientHandler } from './endpoints/registerClient'

export const authMockHandlers = [
  loginHandler,
  logoutHandler,
  registerClientHandler,
  recoverPasswordHandler,
  refreshTokenHandler
]