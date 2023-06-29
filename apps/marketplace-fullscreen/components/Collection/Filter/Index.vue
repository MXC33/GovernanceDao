<template lang="pug">
HList(pos="sticky top-24 md:top-34" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)"  mr="-4 md:(-8)" :scrolling="isScrolling")
  div(w="full" py="3" gap="3" bg="ix-black" px="4 md:8" grid="lt-md:~ cols-3 on-toggle:cols-4" :toggle="!hideToggle" flex="md:~ row" items="stretch")

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


const onOpenFilter = () => {
  const isMobile = onMobile()

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
  return y.value >= 450
})


</script>



