
// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  extends: [
    '@ix/base'
  ],

  typescript: {
    includeWorkspace: true
  },

  modules: [
    '@nuxtjs/i18n',
  ],

  i18n: {
    lazy: true,
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
  watch: [
    './unocss.config.ts',
    '@ix/base/unocss.config'
  ],

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
    plugins: [
      nodePolyfills({
        exclude: [
          'fs', // Excludes the polyfill for `fs` and `node:fs`.
        ],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            'removeDimensions',
          ]
        },
      })
    ],
    server: {
      hmr: {
        port: 8006,
      },
    },
  },
})