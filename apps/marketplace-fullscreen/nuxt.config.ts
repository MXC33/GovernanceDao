// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: ['@ix-apps/base']
  extends: ['../../layers/base'],
  typescript: {
    includeWorkspace: true
  }
})
