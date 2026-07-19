import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { Routes } from './routes/Routes'
import { store } from './store'
import { theme } from '@/shared/config'
import './styles/App.css'

export const App = () => {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        {/* <Notification/> */}
        <Routes />
      </MantineProvider>
    </Provider>
  )
}
