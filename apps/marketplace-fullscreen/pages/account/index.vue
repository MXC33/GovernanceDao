<template lang="pug">
Account(:data="data" v-if="data" )
</template>
  
  
<script lang="ts" setup>

import { useCollectionSettings } from "~/composables/useCollection";
import type { CollectionPayload } from '~/composables/useCollection';

const body = ref<CollectionPayload>({
  page_key: 0,
  order: 0,
  filter: {
    owned: true,
    type: 0,
    search: "",
    attributes: []
  }
})

const { data: data, execute: fetchCollection, refresh: refresh } = usePersonalAssetAPI(body.value)

const { activeFilters } = useCollectionSettings()

const createFilters = () => {
  if (data.value)
    activeFilters.value = data.value.filters.map((filter) => ({
      ...filter,
      value: filter.value.map((name) => ({
        name,
        selected: false
      }))
    }))
}

watch(() => data, (value) => {
  if (activeFilters.value.length < 1)
    createFilters()
}, { deep: true })

watch(() => activeFilters, () => {
  body.value.page_key = 0
  body.value.filter.attributes = []
  activeFilters.value.forEach((name) => {
    name.value.forEach((value) => {
      if (value.selected)
        body.value.filter.attributes.push({
          trait_type: name.trait_type,
          value: value.name
        })
    })
  })
  if (data.value)
    data.value.nfts = []
  refresh()
}, { immediate: true, deep: true })

onBeforeUnmount(() => {
  activeFilters.value = []
})
onMounted(() => {
  fetchCollection()
})
</script>