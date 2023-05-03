import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    includeWorkspace: true
  },
  css: [
    resolve('./assets/styles/fonts.css'),
    resolve('./assets/styles/colors.css'),
    resolve('./assets/styles/corners.css'),
    resolve('./assets/styles/cuts.css'),
    resolve('./assets/styles/transitions.css'),
    resolve('./assets/styles/corporations.css'),
    '@unocss/reset/tailwind.css',
  ],
  modules: [
    '@unocss/nuxt',
  ],
  unocss: {
    configFile: resolve('./unocss.config.ts'),
  }
})
