import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@unocss/nuxt',
    ],
    unocss: {
        uno: true,
        icons: true,
        attributify: true,
        configFile: resolve('./unocss.config.ts'),
      },
})
