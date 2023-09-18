export default {
  lazy: true,
  strategy: 'no_prefix',
  langDir: './locales',
  vueI18n: {
    fallbackLocale: 'en',
  },
  defaultLocale: 'en',
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
}
