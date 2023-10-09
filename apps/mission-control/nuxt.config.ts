import svgLoader from 'vite-svg-loader'

const API_DEV_ENDPOINT = 'https://mission-control-api-dev-s7ito.ondigitalocean.app'
const API_PROD_ENDPOINT = 'https://api-mc.planetix.com'

const GQL_DEV_ENDPOINT = `${API_DEV_ENDPOINT}/graphql`
const GQL_PROD_ENDPOINT = `${API_PROD_ENDPOINT}/graphql`
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'

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
  transpile: [
    'interactive-shader-format'
  ],

  i18n: {
    langDir: './lang',
    locales: [
      {
        code: 'en', file: 'en-US.json'
      }
    ],
  },

  css: [
    '@/assets/styles/fonts.css',
    '@/assets/styles/colors.css',
    '@/assets/styles/corporations.css',
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

  webFonts: {
    provider: 'google',
    fonts: {
      sans: 'Inter'
    }
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
    },
    plugins: [
      {
        ...inject({
          global: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'global'],
          Buffer: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'Buffer'],
        }),
        enforce: 'post',
      },
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