<template lang="pug">
Collection(:data="collectionData" v-if="collectionData")
button(@click="loadMore") LoadMore
</template>


<script lang="ts" setup>

import {useCollectionSettings} from "~/composables/useCollection";
import type {CollectionData, CollectionPayload } from '~/composables/useCollection';

const route = useRoute()
const { collection } = route.params
let data = ref<CollectionData>()
// const body = ref<CollectionPayload>()
const body = ref<CollectionPayload>({
    page_key: 0,
    order: 0,
    filter: {
        owned: false,
        type:3,
        search: "",
        attributes: []
    }
})
const loadMore = async () => {
  body.value.page_key = Number(collectionData.value?.page_key)
    const { data: newCollectionData, execute: fetchCollection, refresh: refresh } = useCollectionData(String(collection), body.value )
    console.log('body.value.page_key', body.value.page_key)
    await fetchCollection()
    data.value = [...data.value, ...newCollectionData.value]
  // refresh()
}

const { data: collectionData, execute: fetchCollection, refresh: refresh } = useCollectionData(String(collection), body.value )

const { activeFilters } = useCollectionSettings()

const createFilters = () => {
    console.log('collectionData.value', collectionData.value)
    if(collectionData.value)
      activeFilters.value = collectionData.value.filters.map((filter) => ({
          ...filter,
          value: filter.value.map((name) => ({
              name,
              selected: false
          }))
      }))

    console.log("New filters", activeFilters.value)
}

watch(() => collectionData, (value, oldValue, onCleanup) => {
    console.log('watch oldValue', oldValue)
    if(!oldValue.value)
      createFilters()
}, { deep: true })

watch(() => activeFilters, () => {
    console.log(' activeFilters.value',  activeFilters.value)
    body.value.page_key = 0
    body.value.filter.attributes = []
    activeFilters.value.forEach((name) => {
        name.value.forEach((value) => {
          if(value.selected)
              body.value.filter.attributes.push({
                  trait_type: name.trait_type,
                  value: value.name
              })
        })
    })
    // fetchCollection()
    refresh()
    console.log('fetchCollection()', body.value)
}, { immediate: true, deep: true })
//
onBeforeUnmount(() => {
    activeFilters.value = []
})
onMounted(async () => {
    await fetchCollection()
    // await loadMore()
    nextTick(()=>{
      createFilters()
    })
    console.log('collectionData', collectionData.value)
})
try {

}
catch (e) {
    console.log('e', e)
}

</script>