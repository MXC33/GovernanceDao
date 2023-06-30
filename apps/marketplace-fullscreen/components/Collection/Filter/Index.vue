<template lang="pug">
HList(pos="sticky top-[calc(6.5rem+var(--header-offset))] md:top-34" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)" mr="-4 md:(-8)" :scrolling="isScrolling" transition="all")
  div(w="full" py="3" bg="ix-black" gap="md:3" px="4 md:8" flex="~ row" justify="lt-md:between")

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
const { isMobile } = useDevice()
const onOpenFilter = () => {
  if (isMobile.value)
    showMobileFilter.value = !showMobileFilter.value
  else
    emit('toggleFilter')
}

defineProps<{
  data?: CollectionData
  items: IXToken[],
  filters: any[],
  hideToggle?: boolean,
  context: CollectionContext
}>()

const emit = defineEmits(["toggleFilter"])

const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 320
})


</script>



