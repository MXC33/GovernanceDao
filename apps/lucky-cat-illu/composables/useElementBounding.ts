
import { type MaybeElement, useElementBounding } from "@vueuse/core"
import { type Ref } from "vue"

interface ElementBoundingOptions {
  windowResize?: boolean
  windowScroll?: boolean
}

export const useIntersectingElementBounding = (element: Ref<MaybeElement>, options?: ElementBoundingOptions) => {
  const maybeElement = ref<MaybeElement>(null)

  const { width, height, top, bottom, y } = useElementBounding(maybeElement, options)

  useIntersectionObserver(element, ([{ isIntersecting }]) => {
    if (isIntersecting)
      maybeElement.value = element.value
    else
      maybeElement.value = null
  }, { threshold: 0 })

  return {
    width, height, top, y, bottom
  }
}