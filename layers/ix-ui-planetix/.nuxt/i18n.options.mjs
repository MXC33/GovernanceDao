export const localeCodes = []

export const localeMessages = {
}

export const additionalMessages = Object({})

export const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({})
  nuxtI18nOptions.experimental = Object({"jsTsFormatResource":false})
  nuxtI18nOptions.precompile = Object({"strictMessage":true,"escapeHtml":false})
 const vueI18nConfigLoader = async (context, loader) => {
            const config = await loader().then(r => r.default || r)
            return typeof config === 'object'
              ? config
              : typeof config === 'function'
                ? await config(context)
                : {}
          }
  nuxtI18nOptions.vueI18n = Object({})
  const deepCopy = (src, des, predicate) => {
            for (const key in src) {
              if (typeof src[key] === 'object') {
                if (!typeof des[key] === 'object') des[key] = {}
                deepCopy(src[key], des[key], predicate)
              } else {
                if (predicate) {
                  if (predicate(src[key], des[key])) {
                    des[key] = src[key]
                  }
                } else {
                  des[key] = src[key]
                }
              }
            }
          }
          const mergeMessages = async (messages, context, loader) => {
            const layerConfig = await vueI18nConfigLoader(context, loader)
            const vueI18n = layerConfig.vueI18n || {}
            const layerMessages = vueI18n.messages || {}
            for (const [locale, message] of Object.entries(layerMessages)) {
              deepCopy(message, messages[locale])
            }
          }
  nuxtI18nOptions.locales = []
  nuxtI18nOptions.defaultLocale = ""
  nuxtI18nOptions.defaultDirection = "ltr"
  nuxtI18nOptions.routesNameSeparator = "___"
  nuxtI18nOptions.trailingSlash = false
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default"
  nuxtI18nOptions.strategy = "prefix_except_default"
  nuxtI18nOptions.lazy = false
  nuxtI18nOptions.langDir = null
  nuxtI18nOptions.rootRedirect = null
  nuxtI18nOptions.detectBrowserLanguage = Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true})
  nuxtI18nOptions.differentDomains = false
  nuxtI18nOptions.baseUrl = ""
  nuxtI18nOptions.dynamicRouteParams = false
  nuxtI18nOptions.customRoutes = "page"
  nuxtI18nOptions.pages = Object({})
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false
  nuxtI18nOptions.types = "composition"
  nuxtI18nOptions.debug = false
  return nuxtI18nOptions
}

export const nuxtI18nOptionsDefault = Object({experimental: Object({"jsTsFormatResource":false}),precompile: Object({"strictMessage":true,"escapeHtml":false}),vueI18n: "",locales: [],defaultLocale: "",defaultDirection: "ltr",routesNameSeparator: "___",trailingSlash: false,defaultLocaleRouteNameSuffix: "default",strategy: "prefix_except_default",lazy: false,langDir: null,rootRedirect: null,detectBrowserLanguage: Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true}),differentDomains: false,baseUrl: "",dynamicRouteParams: false,customRoutes: "page",pages: Object({}),skipSettingLocaleOnNavigate: false,types: "composition",debug: false})

export const nuxtI18nInternalOptions = Object({__normalizedLocales: []})
export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const NUXT_I18N_PRECOMPILE_ENDPOINT = "/__i18n__/precompile"
export const NUXT_I18N_PRECOMPILED_LOCALE_KEY = "i18n-locales"
export const isSSG = false
export const isSSR = true
