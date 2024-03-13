import { defineConfig } from 'cypress'

export default defineConfig({
  compilerOptions: {
    strict: true,
  },
  include: ['cypress/**/*.ts'],
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
