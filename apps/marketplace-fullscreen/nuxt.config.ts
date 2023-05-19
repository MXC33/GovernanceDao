
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '@ix/base'
  ],
  css: [
    '@/assets/styles/fonts.css'
  ],
  typescript: {
    includeWorkspace: true
  },

  modules: [
    'v-lazy-show/nuxt'
  ],

  i18n: {
    precompile: { strictMessage: false },
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
        name: 'English'

      },
      {
        code: 'cn',
        file: 'en-CN.json',
        name: 'Chinese',
      },
      {
        code: 'ph',
        file: 'en-PH.json',
        name: 'Filipino'
      },
      {
        code: 'vn',
        file: 'en-VN.json',
        name: 'Vietnamese'
      },
      {
        code: 'ru',
        file: 'en-RU.json',
        name: 'Russian'
      }
    ],
    langDir: 'lang/',
    defaultLocale: 'en',
  },
  nitro: {
    preset: 'vercel',
  },
  vite: {
    server: {
      hmr: {
        port: 8001,
      },
    },
  },
})
