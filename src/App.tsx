import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { CreateApplicationManager } from './features/applications/components/CreateApplicationManager'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './store'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { MainLayout } from './components/MainLayout'
import { SetupPasswordPage } from './pages/SetupPasswordPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  const token = useAppSelector((state) => state.authSlice.accessToken)

  return (
    <MantineProvider theme={theme}>
      {/* <Notification/> */}
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/setup-password' element={<SetupPasswordPage />} />
              <Route path='*' element={<Navigate to='/login' replace />} />
            </>
          ) : (
            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route
                path='/create-application'
                element={<CreateApplicationManager />}
              />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
