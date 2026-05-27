import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { IS_RUN_MOCK } from './enableMock.ts'
import App from './App.tsx'
import './index.css'

const deferRender = async () => {
  // Только для режима разработки
  if (!import.meta.env.DEV || !IS_RUN_MOCK) return

  // Запуск мока
  const { worker } = await import('./mock.ts')
  return worker.start()
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
    </StrictMode>
  )
})
