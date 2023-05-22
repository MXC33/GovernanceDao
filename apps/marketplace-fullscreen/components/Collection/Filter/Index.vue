<template lang="pug">
HList(w="full" pos="sticky top-34" z="2" b="on-scroll:(b-1 gray-400)" :scroll="isScrolling")
  HList(w="full" py="3" space-x="3" bg="ix-black")

    CollectionFilterToggleFilter(@click="$emit('toggleFilter')")

    Search(:options="items" :search-paths="['name']" w="full")
      template(#item="{item}")
        HList(items="center" space-x="3")
          div(w="12")
            TokenImage(:token="item"  :key="'img' + getTokenKey(item)")

          TokenName(:token="item" capitalize="~" :key="'name' + getTokenKey(item)")

    CollectionFilterToggleDisplay()
    
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { getTokenKey } = useTokens()
defineProps<{
  items: IXToken[],
  filters: any[]
}>()

defineEmits<{
  toggleFilter: []
}>()

const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 550
})
</script>



