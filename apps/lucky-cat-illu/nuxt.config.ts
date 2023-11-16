
import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  extends: [
    '@ix/base'
  ],
  css: [
    '@/assets/styles/fonts.css',
    '@/assets/styles/transitions.css',
    '@unocss/reset/tailwind.css',
  ],

  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    "@unocss/nuxt",

  ],

  runtimeConfig: {
    public: {
      token: "0xf538296e7dd856af7044deec949489e2f25705bc"
    }
  },

  i18n: {
    lazy: true,
    strategy: 'no_prefix',
    langDir: './lang',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false,
    },
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
        name: 'English'
      }
    ],
  },


  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: "en" }
    }
  },

  watch: ['./unocss.config.ts', '@ix/base/unocss.config'],

  imports: {
    dirs: [
      'composables/**'
    ]
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    resolve: {
      alias: {
        jsbi: path.resolve(__dirname, "../../node_modules/jsbi/dist/jsbi-cjs.js"),
      }
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },

    plugins: [
      nodePolyfills(),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            'removeDimensions',
          ]
        },
      })
    ],
  },
})
