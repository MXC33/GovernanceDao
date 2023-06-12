<template lang="pug">
HList(pos="sticky top-34" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)" mr="-4 md:(-8)" :scrolling="isScrolling")
  HList(w="full" py="3" space-x="3" bg="ix-black" px="4 md:8")

    CollectionFilterToggleFilter(@click="$emit('toggleFilter')")

    Search(:options="items" :search-paths="['name']" w="md:full" flex-grow="lt-md:1")
      template(#item="{item}")
        HList(items="center" space-x="3")
          div(w="12")
            TokenImage(:token="item"  :key="'img' + getTokenKey(item)")

          TokenName(:token="item" capitalize="~" :key="'name' + getTokenKey(item)")

    //- CollectionFilterSort(:context="context")

    CollectionFilterToggleDisplay(v-if="!hideToggle")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { getTokenKey } = useTokens()

defineProps<{
  items: IXToken[],
  filters: any[],
  hideToggle?: boolean,
  context: string
}>()

defineEmits<{
  toggleFilter: []
}>()

const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 450
})

</script>



