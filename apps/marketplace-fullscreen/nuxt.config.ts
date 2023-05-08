// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../../layers/ix-ui-planetix',
    '../../layers/ix-base'
  ],
  css: [
    '@/assets/styles/fonts.css'
  ],
  typescript: {
    includeWorkspace: true
  },

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
})
