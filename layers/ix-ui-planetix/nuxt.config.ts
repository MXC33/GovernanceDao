import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ['../ix-base'],
  typescript: {
    includeWorkspace: true
  },
  i18n: {

  },
  unocss: {
    configFile: resolve('./unocss.config.ts'),
  }
})
