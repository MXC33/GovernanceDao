<template lang="pug">
HList(pos="sticky top-$page-header-offset" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)" mr="-4 md:(-8)" :scrolling="isScrolling" transition="all" ref="element")
  div(flex="~ row" w="full" bg="ix-black" gap="4 md:3" p="l-4 r-4 t-4 b-4 md:(l-8 r-8 t-4 b-4)" :justify="justifyOrder")

    CollectionFilterToggleFilter(@click="onOpenFilter")

    CollectionFilterSearch()

    CollectionFilterSort(:context="context" v-if="context == 'collection'")

    CollectionFilterToggleDisplay(v-if="!hideToggle")

    CollectionFilterMobile(:filters="data?.filters" v-model="showMobileFilter")
  
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import type { CollectionContext, CollectionData } from '~/composables/useCollection'

const showMobileFilter = ref(false)
const element = ref()

const { isMobile } = useDevice()
const { height } = useElementBounding(element)
const { filterHeaderHeight } = useStickyOffsets()

const onOpenFilter = () => {
  if (isMobile.value)
    showMobileFilter.value = !showMobileFilter.value
  else
    emit('toggleFilter')
}

effect(() => {
  const newHeight = Math.round(height.value);
  if (newHeight != filterHeaderHeight.value)
    filterHeaderHeight.value = newHeight
})

const { context } = defineProps<{
  data?: CollectionData
  items: IXToken[],
  filters: any[],
  hideToggle?: boolean,
  context?: CollectionContext
}>()

const justifyOrder = computed(() => {
  if (context != 'collection') {
    return 'start'
  } else {
    return 'between'
  }
})


const emit = defineEmits(["toggleFilter"])

const { device } = useDevice()

const { y } = useWindowScroll()

const isScrolling = computed(() => {
  if (device.value == 'desktop' || device.value == '4k') {
    return y.value >= 505
  } else if (device.value == 'mobile') {
    return y.value >= 305
  }
})


</script>



