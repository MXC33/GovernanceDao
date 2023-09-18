import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "arcade" | "auth" | "eternalab" | "gravity-grade" | "gws" | "lucky" | "new-lands" | "yspace"
declare module "/Users/isakburstrom/dev/ix-apps/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}