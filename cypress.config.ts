import { defineConfig } from 'cypress'
import { RoutesPath } from './src/types/routesPath'

const generatePathsE2Etests = () =>
  Object.keys(RoutesPath).map(
    (routeName) => `src/pages/${routeName}/${routeName}Page.test.ts`
  )

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: generatePathsE2Etests(),
    baseUrl: `http://localhost:${import.meta.env.VITE_SERVER_PORT}`,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
