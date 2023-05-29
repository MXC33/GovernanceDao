<template lang="pug">
Collection(:data="data" v-if="data" :hide-grid="true" :has-button="true" :table-type="'incoming'")
  template(#menu)
    AccountMenu()
</template>
    
    
<script lang="ts" setup>

import { useCollectionSettings } from "~/composables/useCollection";
import type { CollectionPayload } from '~/composables/useCollection';

const body = ref<CollectionPayload>({
  page_key: 0,
  order: 0,
  filter: {
    owned: true,
    type: 2,
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


onBeforeUnmount(() => {
  activeFilters.value = []
})
onMounted(() => {
  fetchCollection()
})
</script>