import { MaybeElement, useIntersectionObserver } from "@vueuse/core"
import { Ref } from "vue"

export const useInView = (element: Ref<MaybeElement>) => {
  const isVisible = ref(false)
  useIntersectionObserver(element, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  }, { threshold: 0 })

  return isVisible
}