import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RoutesPath } from '@/shared/config'
import { MainLayout, OuterLayout } from '@/widgets'

import {
  LoginPage,
  SetupPasswordPage,
  CreateApplicationPage,
  HomePage,
  ProfilePage,
  DownloadDocumentsPage,
} from '@/pages'

export const Routes = () => {
  const token = useSelector((state) => state.auth.accessToken)

  return (
    <BrowserRouter>
      <ReactRoutes>
        {!token ? (
          <Route element={<OuterLayout />}>
            <Route path={RoutesPath.Login} element={<LoginPage />} />
            <Route
              path={RoutesPath.SetupPassword}
              element={<SetupPasswordPage />}
            />
            <Route
              path="*"
              element={<Navigate to={RoutesPath.Login} replace />}
            />
            <Route
              path={RoutesPath.DownloadDocuments}
              element={<DownloadDocumentsPage />}
            />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path={RoutesPath.Profile} element={<ProfilePage />} />
            <Route
              path={RoutesPath.CreateApplication}
              element={<CreateApplicationPage />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </ReactRoutes>
    </BrowserRouter>
  )
}
