import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "corporation" | "default" | "mission-control"
declare module "/Users/isakburstrom/dev/ix-apps/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}