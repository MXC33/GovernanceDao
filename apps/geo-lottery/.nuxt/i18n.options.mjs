
// @ts-nocheck


export const localeCodes =  [
  "en",
  "cn",
  "ph",
  "vn",
  "ru"
]

export const localeMessages = {
  "en": [{ key: "../../../layers/ix-base/lang/en-US.json", load: () => import("../../../layers/ix-base/lang/en-US.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_layers_ix_base_lang_en_US_json" */), cache: true },
{ key: "../lang/en-US.json", load: () => import("../lang/en-US.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_apps_geo_lottery_lang_en_US_json" */), cache: true }],
  "cn": [{ key: "../lang/en-CN.json", load: () => import("../lang/en-CN.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_apps_geo_lottery_lang_en_CN_json" */), cache: true }],
  "ph": [{ key: "../lang/en-PH.json", load: () => import("../lang/en-PH.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_apps_geo_lottery_lang_en_PH_json" */), cache: true }],
  "vn": [{ key: "../lang/en-VN.json", load: () => import("../lang/en-VN.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_apps_geo_lottery_lang_en_VN_json" */), cache: true }],
  "ru": [{ key: "../lang/en-RU.json", load: () => import("../lang/en-RU.json" /* webpackChunkName: "locale__Users_mac_Documents_GitHub_GovernanceDao_apps_geo_lottery_lang_en_RU_json" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": false,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "files": [
        "../../layers/ix-base/lang/en-US.json",
        "lang/en-US.json"
      ]
    },
    {
      "code": "cn",
      "name": "Chinese",
      "files": [
        "lang/en-CN.json"
      ]
    },
    {
      "code": "ph",
      "name": "Filipino",
      "files": [
        "lang/en-PH.json"
      ]
    },
    {
      "code": "vn",
      "name": "Vietnamese",
      "files": [
        "lang/en-VN.json"
      ]
    },
    {
      "code": "ru",
      "name": "Russian",
      "files": [
        "lang/en-RU.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "./lang/",
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const nuxtI18nOptionsDefault = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [],
  "defaultLocale": "",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": null,
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false
}

export const nuxtI18nInternalOptions = {
  "__normalizedLocales": [
    {
      "code": "en",
      "name": "English",
      "files": [
        {
          "path": "../../layers/ix-base/lang/en-US.json"
        },
        {
          "path": "lang/en-US.json"
        }
      ]
    },
    {
      "code": "cn",
      "name": "Chinese",
      "files": [
        {
          "path": "lang/en-CN.json"
        }
      ]
    },
    {
      "code": "ph",
      "name": "Filipino",
      "files": [
        {
          "path": "lang/en-PH.json"
        }
      ]
    },
    {
      "code": "vn",
      "name": "Vietnamese",
      "files": [
        {
          "path": "lang/en-VN.json"
        }
      ]
    },
    {
      "code": "ru",
      "name": "Russian",
      "files": [
        {
          "path": "lang/en-RU.json"
        }
      ]
    }
  ]
}

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

