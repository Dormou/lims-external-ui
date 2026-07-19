import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const deferRender = async () => {
  // Только для режима разработки
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK !== 'true')
    return

  // Запуск мока
  const { worker } = await import('./mock')
  return worker.start()
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
