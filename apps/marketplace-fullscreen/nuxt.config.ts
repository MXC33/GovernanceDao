
// https://nuxt.com/docs/api/configuration/nuxt-config

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineNuxtConfig({
  extends: [
    '@ix/base'
  ],
  css: [
    '@/assets/styles/fonts.css'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: "en" }
    }
  },

  htmlValidator: {
    usePrettier: true,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard'
      ],
      rules: {
        'element-required-attributes': 'off',
        'heading-level': 'off',
        'text-content': 'off',
        'wcag/h30': 'off',
        'wcag/h37': 'off',
        'input-missing-label': 'off'
      }
    }
  },
  watch: ['./unocss.config.ts', '@ix/base/unocss.config'],

  typescript: {
    includeWorkspace: true
  },

  modules: [
    'v-lazy-show/nuxt'
  ],

  imports: {
    dirs: [
      'composables/**'
    ]
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

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin()
        ]
      }
    },
    server: {
      hmr: {
        port: 8001,
      },
    },
  },
})
