import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
import svgLoader from 'vite-svg-loader'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const API_DEV_ENDPOINT = 'https://mission-control-api-dev-s7ito.ondigitalocean.app'
const API_PROD_ENDPOINT = 'https://api-mc.planetix.com'

const GQL_DEV_ENDPOINT = `${API_DEV_ENDPOINT}/graphql`
const GQL_PROD_ENDPOINT = `${API_PROD_ENDPOINT}/graphql`


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({


  typescript: {
    includeWorkspace: true
  },

  //@ts-ignore
  transpile: [
    'vue3-carousel',
    '@walletconnect/modal',
    '@walletconnect/ethereum-provider',
    '@coinbase/wallet-sdk'
  ],

  css: [
    resolve('./assets/styles/fonts.css'),
    resolve('./assets/styles/colors.css'),
    resolve('./assets/styles/corners.css'),
    resolve('./assets/styles/cuts.css'),
    resolve('./assets/styles/transitions.css'),
    resolve('./assets/styles/corporations.css'),
    resolve('./assets/styles/variables.css'),
    'vue3-carousel/dist/carousel.css',
    '@unocss/reset/tailwind.css',
  ],
  modules: [
    'nuxt-graphql-client',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  imports: {
    dirs: [
      'composables/**'
    ]
  },

  device: {
    refreshOnResize: true
  },

  unocss: {
    configFile: resolve('./unocss.config.ts'),
  },

  watch: [resolve('./unocss.config.ts')],

  runtimeConfig: {
    public: {
      MC_API: process.env.CHAIN_NET == 'test' ? API_DEV_ENDPOINT : API_PROD_ENDPOINT,
      CHAIN_NET: process.env.CHAIN_NET,
      s3: (process.env.PUBLIC_ASSETS ?? '/s3'),
      'graphql-client': {
        clients: {
          default: {
            schema: resolve('./schema.graphql'),

            host: process.env.GQL_HOST || (process.env.CHAIN_NET === 'test' ? GQL_DEV_ENDPOINT : GQL_PROD_ENDPOINT),
          }
        }
      },
    }
  },
  vite: {
    server: {
      hmr: {
        port: 8002,
      },
    },
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
  }
})
