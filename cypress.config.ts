import { loadEnv } from 'vite'

import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

import { RoutesPath } from './src/shared/config/routesPath'

const FSDLayers = { 
  pages: 'слой страниц', 
  features: 'слой фич' 
} as const


const generatePathsE2Etests = () => Object.keys(FSDLayers).map(fsdl =>
    Object.keys(RoutesPath).map(routeName => `src/processes/${fsdl}/${routeName}/${routeName}Page.test.ts`)
).flat()

const viteEnv = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  'VITE_'
)

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor())
    },
    specPattern: generatePathsE2Etests(),
    baseUrl: `http://localhost:${viteEnv.VITE_SERVER_PORT}`,
    allowCypressEnv: false,
    supportFile: false,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
