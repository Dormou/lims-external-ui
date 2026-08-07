export const RoutesPath = {
  Home: '/',
  Login: '/login',
  Profile: '/profile',
  SetupPassword: '/setup-password',
  CreateApplication: '/create-application',
  DownloadDocuments: '/download-documents'
} as const

export type Routes = (typeof RoutesPath)[keyof typeof RoutesPath]
