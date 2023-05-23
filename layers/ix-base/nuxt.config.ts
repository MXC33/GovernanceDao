import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
import svgLoader from 'vite-svg-loader'

const API_DEV_ENDPOINT = 'https://mission-control-api-dev-s7ito.ondigitalocean.app'
const API_PROD_ENDPOINT = 'https://api-mc.planetix.com'

const GQL_DEV_ENDPOINT = `${API_DEV_ENDPOINT}/graphql`
const GQL_PROD_ENDPOINT = `${API_PROD_ENDPOINT}/graphql`

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true
  },
  typescript: {
    includeWorkspace: true
  },
  css: [
    resolve('./assets/styles/fonts.css'),
    resolve('./assets/styles/colors.css'),
    resolve('./assets/styles/corners.css'),
    resolve('./assets/styles/cuts.css'),
    resolve('./assets/styles/transitions.css'),
    resolve('./assets/styles/corporations.css'),
    '@unocss/reset/tailwind.css',
  ],
  modules: [
    'nuxt-graphql-client',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  i18n: {

  },

  imports: {
    dirs: [
      'composables/**'
    ]
  },


  unocss: {
    configFile: resolve('./unocss.config.ts'),
  },

  runtimeConfig: {
    public: {
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
        port: 8001,
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    plugins: [
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
