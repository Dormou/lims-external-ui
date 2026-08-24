const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { loadEnv } from 'vite'
import { defineConfig } from 'cypress';
import { RoutesPath } from './src/shared/config/routesPath'


import vitePreprocessor from 'cypress-vite'
import path from 'path';
import { fileURLToPath } from 'url';

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
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
      on('file:preprocessor', vitePreprocessor(path.resolve(__dirname, './vite.config.ts')));
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
