import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { SupportModal } from '../support-modal/SupportModal'

export const MainLayout = () => {
  return (
    <AppShell header={{ height: 80 }} footer={{ height: 48 }}>
      <AppShell.Header withBorder={false}>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className="main-content-container">
          <Outlet />
        </div>
      </AppShell.Main>

      <AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>

      <SupportModal />

    </AppShell>
  )
}
