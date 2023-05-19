<template lang="pug">
HList(:b="borderOnScroll" pos="sticky top-34" z="3" ml="-8" mr="-8")
HList(w="full" pos="sticky top-34" z="2")
  HList(w="full" py="3" space-x="3" bg="ix-black")

    CollectionFilterToggleFilter(@click="$emit('toggle-filter')")

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

const { y } = useWindowScroll()

const borderOnScroll = computed(() => {
  if (y.value >= 550)
    return 'b-1 gray-600'
  return '0'
})

</script>



