export const RoutesPath = {
  Home: '/',
  Login: '/login',
  Profile: '/profile',
  SetupPassword: '/setup-password',
  CreateApplication: '/create-application',
} as const

export type Routes = (typeof RoutesPath)[keyof typeof RoutesPath]
