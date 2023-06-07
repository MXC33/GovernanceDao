<template lang="pug">
Collection(:data="data" v-if="data")
  template(#bottom)
    HList(w="lt-md:full" justify="center" py="2")
      button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") Load More
</template>


<script lang="ts" setup>

const route = useRoute()
const { contract } = route.params

const el = ref()
const child = ref()
const { height: parentHeight } = useElementBounding(el)
const { height: childHeight } = useElementBounding(child)
const { arrivedState } = useScroll(el)
const { bottom } = toRefs(arrivedState)



const { getCollectionURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners } = useCollectionData(getCollectionURL(String(contract), 'polygon'))

await fetchCollection()
useHead({
  title: (data.value?.name ? data.value.name + " | " : "") + "Marketplace | PlanetIX"
})
setupCollectionListeners()

</script>
