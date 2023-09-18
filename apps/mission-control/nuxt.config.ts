require('dotenv').config()
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgLoader from 'vite-svg-loader'

const API_DEV_ENDPOINT = 'https://mission-control-api-dev-s7ito.ondigitalocean.app'
const API_PROD_ENDPOINT = 'https://api-mc.planetix.com'

const GQL_DEV_ENDPOINT = `${API_DEV_ENDPOINT}/graphql`
const GQL_PROD_ENDPOINT = `${API_PROD_ENDPOINT}/graphql`

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: [
    '@ix/base'
  ],

  typescript: {
    includeWorkspace: true,
    shim: false,
    strict: false
  },

  imports: {
    dirs: [
      'composables/**'
    ]
  },
  //@ts-ignore
  transpile: ['vue3-carousel'],

  css: [
    '@/assets/styles/fonts.css',
    '@/assets/styles/colors.css',
    '@/assets/styles/corners.css',
    '@/assets/styles/transitions.css',
    '@/assets/styles/corporations.css',
    '@unocss/reset/tailwind.css',
    'vue3-carousel/dist/carousel.css'
  ],

  define: {
    global: "globalThis",
  },

  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            schema: './schema.graphql',

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

  webFonts: {
    provider: 'google',
    fonts: {
      sans: 'Inter'
    }
  },

  alias: {
    util: 'rollup-plugin-node-polyfills/polyfills/util'
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['slide', 'carousel'].includes(tag)
    }
  },

  vite: {
    server: {
      hmr: {
        port: 8005,
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
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
        defaultImport: 'component',
        svgoConfig: {
          multipass: true,
          plugins: [
            'removeDimensions',
          ]
        },
      })
    ],
  },

});