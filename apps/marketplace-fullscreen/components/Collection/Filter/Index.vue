<template lang="pug">
HList(pos="sticky top-34" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)" mr="-4 md:(-8)" :scrolling="isScrolling")
  HList(w="full" py="3" space-x="3 md:3" bg="ix-black" px="4 md:8" justify="lt-md:start")

    CollectionFilterToggleFilter(@toggle="$emit('toggleFilter')" :data="data")

    CollectionFilterSearch()

    CollectionFilterSort(:context="context" v-if="context == 'collection'")

    CollectionFilterToggleDisplay(v-if="!hideToggle")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import type { CollectionContext, CollectionData } from '~/composables/useCollection'

defineProps<{
  data?: CollectionData
  items: IXToken[],
  filters: any[],
  hideToggle?: boolean,
  context: CollectionContext
}>()

defineEmits<{
  toggleFilter: []
}>()

const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 450
})

</script>



