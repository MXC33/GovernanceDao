import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["graphql-client"]?: typeof import("nuxt-graphql-client").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["unocss"]?: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/i18n", Exclude<NuxtConfig["i18n"], boolean>] | ["nuxt-graphql-client", Exclude<NuxtConfig["graphql-client"], boolean>] | ["@unocss/nuxt", Exclude<NuxtConfig["unocss"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   "graphql-client": {
      clients: any,
   },
  }
  interface PublicRuntimeConfig {
   MEDIA_URL: string,

   MC_API: string,

   CHAIN_NET: string,

   API_BASE_URL: string,

   s3: string,

   "graphql-client": {
      clients: {
         default: {
            token: {
               type: string,

               name: string,
            },

            proxyCookies: boolean,

            tokenStorage: {
               mode: string,

               cookieOptions: {
                  maxAge: number,

                  secure: boolean,
               },

               name: string,
            },

            preferGETQueries: boolean,

            schema: string,

            host: string,
         },
      },
   },

   apiEndpoint: string,

   cacheKey: string,

   environment: string,

   disablePlaycanvas: boolean,

   mapboxApiToken: string,

   i18n: {
      baseUrl: string,

      locales: {
         en: {
            domain: any,
         },
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }