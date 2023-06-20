<template lang="pug">
HList(pos="sticky top-34" z="8" b="on-scrolling:t-1 gray-600" ml="-4 md:(-8)" mr="-4 md:(-8)" :scrolling="isScrolling")
  HList(w="full" py="3" space-x="3" bg="ix-black" px="4 md:8")

    CollectionFilterToggleFilter(@toggle="$emit('toggleFilter')" :data="data")

    CollectionFilterSearch()

    //- Search(:options="collection" @selected="updateSearchString")
    //-   template(#item="{item}") {{ item }}

    CollectionFilterSort(:context="context" v-if="context == 'collection'")

    CollectionFilterToggleDisplay(v-if="!hideToggle")

</template>

<script lang="ts" setup>
// import { watchDebounced } from '@vueuse/core'
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import type { CollectionContext, CollectionData } from '~/composables/useCollection'

// const { activeSearchTerm } = useCollectionSettings()

// const route = useRoute()
// const { contract } = route.params
// const { getCollectionURL } = useCollectionsURL()

// let searchTerm = ref(activeSearchTerm.value ?? '')

// const { data: collectionData, execute: fetchCollection } = useCollectionData(getCollectionURL(String(contract), 'polygon'), {
//   filter: {
//     owned: false,
//     type: 0,
//     search: searchTerm.value
//   }
// })

// await fetchCollection()

// const updateSearchString = (newSearchTerm: string) => {
//   console.log('searchTerm has changed to', newSearchTerm)
//   activeSearchTerm.value = newSearchTerm
// }

// const collection = computed(() => collectionData?.value?.nfts?.filter(item => item.name).map(item => item.name) || [])

// console.log('collection', collection.value)

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



