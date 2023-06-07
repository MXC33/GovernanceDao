import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["graphql-client"]?: typeof import("nuxt-graphql-client").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["unocss"]?: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("/Users/isakburstrom/.nvm/versions/node/v16.17.0/lib/node_modules/@nuxt/devtools/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["nuxt-graphql-client", Exclude<NuxtConfig["graphql-client"], boolean>] | ["@nuxtjs/i18n", Exclude<NuxtConfig["i18n"], boolean>] | ["@unocss/nuxt", Exclude<NuxtConfig["unocss"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["/Users/isakburstrom/.nvm/versions/node/v16.17.0/lib/node_modules/@nuxt/devtools/module", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
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

   i18n: {
      precompile: {
         strictMessage: boolean,

         escapeHtml: boolean,
      },
   },
  }
  interface PublicRuntimeConfig {
   MC_API: string,

   CHAIN_NET: string,

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

   i18n: {
      experimental: {
         jsTsFormatResource: boolean,
      },

      baseUrl: string,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }