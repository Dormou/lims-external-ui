import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

// Удаляет файл msw после сборки
const removeMockServiceWorker = () => ({
  name: 'remove-mock-service-worker',
  closeBundle() {
    const workerPath = resolve(__dirname, 'dist', 'mockServiceWorker.js')
    try {
      rmSync(workerPath, { force: true })
      console.log(
        '\n[remove-mock-service-worker] mockServiceWorker.js успешно удален из dist'
      )
    } catch (e) {
      console.error('\n[remove-mock-service-worker] Ошибка удаления:', e)
    }
  },
})

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const env = loadEnv(command, process.cwd(), '')
  const serverPort = Number(env.VITE_SERVER_PORT) ?? 5173

  return {
    plugins: [
      react(),
      env.VITE_ENABLE_MOCK !== 'true' && removeMockServiceWorker(),
    ],
    server: {
      port: serverPort,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL ?? `http://localhost:${serverPort}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // исключение мок данных из сборки
    build: {
      rollupOptions: {
        external: ['src/api/**/mock/**/*', 'src/mock.ts', 'cypress.config.ts'],
      },
    },
  }
})
