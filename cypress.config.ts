import { loadEnv } from 'vite'
import { defineConfig } from 'cypress'
import { RoutesPath } from './src/shared/config/routesPath'

// const generatePathsE2Etests = () =>
//   Object.keys(RoutesPath).map(
//     (routeName) => `src/pages/${routeName}/${routeName}Page.test.ts`
//   )

const viteEnv = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  'VITE_'
)

const generatePathsE2Etests = () => Object.keys(RoutesPath).map(routeName => `src/processes/${routeName}/${routeName}Page.test.ts`)

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
