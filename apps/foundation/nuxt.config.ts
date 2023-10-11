
// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgLoader from 'vite-svg-loader'
const API_DEV_ENDPOINT = 'https://mission-control-api-dev-s7ito.ondigitalocean.app'
const API_PROD_ENDPOINT = 'https://api-mc.planetix.com'

const GQL_DEV_ENDPOINT = `${API_DEV_ENDPOINT}/graphql`
const GQL_PROD_ENDPOINT = `${API_PROD_ENDPOINT}/graphql`
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

  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            schema: '../../layers/ix-base/schema.graphql',

            host: process.env.GQL_HOST || (process.env.CHAIN_NET === 'test' ? GQL_DEV_ENDPOINT : GQL_PROD_ENDPOINT),
          }
        }
      },
      apiEndpoint: process.env.CHAIN_NET === 'test' ? API_DEV_ENDPOINT : API_PROD_ENDPOINT,
      cacheKey: String(new Date().getTime()),
      environment: process.env.NODE_ENV,
      s3: (process.env.PUBLIC_ASSETS ?? '/s3'),
      INFURA_ID: process.env.INFURA_ID,
      CHAIN_NET: process.env.CHAIN_NET,
      disablePlaycanvas: !!process.env.DISABLE_PLAYCANVAS,

      mapboxApiToken:
        "pk.eyJ1IjoiZG91Z2xhc25pYmlydSIsImEiOiJjbDEwcW10YW0wZWlmM2ptczFqeWR4NGx0In0.DyXm6Qm2Lk4kbvDOwuQVkw",

    }
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
