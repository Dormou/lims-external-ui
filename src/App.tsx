import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { CreateApplicationManager } from './features/applications/components/CreateApplicationManager'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './store'
import { MainLayout } from './components/MainLayout'
import { RoutesPath } from './types/routesPath'

import { LoginPage } from './pages/Login/LoginPage'
import { HomePage } from './pages/Home/HomePage'
import { SetupPasswordPage } from './pages/SetupPassword/SetupPasswordPage'
import { ProfilePage } from './pages/Profile/ProfilePage'

function App() {
  const token = useAppSelector((state) => state.authSlice.accessToken)

  return (
    <MantineProvider theme={theme}>
      {/* <Notification/> */}
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path={RoutesPath.Login} element={<LoginPage />} />
              <Route
                path={RoutesPath.SetupPassword}
                element={<SetupPasswordPage />}
              />
              <Route
                path="*"
                element={<Navigate to={RoutesPath.Login} replace />}
              />
            </>
          ) : (
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path={RoutesPath.Profile} element={<ProfilePage />} />
              <Route
                path={RoutesPath.CreateApplication}
                element={<CreateApplicationManager />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
