import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    includeWorkspace: true
  },
  css: [
    'assets/styles/fonts.css',
    'assets/styles/colors.css',
    'assets/styles/corners.css',
    'assets/styles/cuts.css',
    'assets/styles/transitions.css',
    'assets/styles/corporations.css',
    '@unocss/reset/tailwind.css',
  ],
  modules: [
    '@unocss/nuxt',
  ],
  unocss: {
    configFile: resolve('./unocss.config.ts'),
  }
})
