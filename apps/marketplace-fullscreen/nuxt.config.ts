// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../../layers/ix-base'],
  css: [
    'assets/styles/fonts.css'
  ],
  typescript: {
    includeWorkspace: true
  },
})
