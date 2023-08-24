import { onMounted, Ref } from 'vue'

export const useScrollLoadMore = (el: Ref<HTMLElement | null>, loadNextPage: () => void) => {
  const isVisible = useElementVisibility(el)

  onMounted(() => {
    watch(isVisible, (visible) => {
      if (visible) {

        loadNextPage()
      }
    })
  })
}