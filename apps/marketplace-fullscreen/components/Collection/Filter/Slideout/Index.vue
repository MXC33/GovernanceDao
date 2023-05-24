<template lang="pug">
VList(w="100" space-y="3")
  ContentDrawer(v-for="(item, filterIndex) in activeFilters" )
    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full" px="3")
        CollectionFilterRowSelect(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value")
          template(#default) {{ option.name }}

</template>

<script lang="ts" setup>
import type { APIFilter, Filter } from "~/composables/useCollection";

const props = defineProps<{
  items: APIFilter[]
}>()

const activeFilters = ref<Filter[]>([])

const createFilters = () => {
  activeFilters.value = props.items.map((filter) => ({
    ...filter,
    value: filter.value.map((name) => ({
      name,
      selected: false
    }))
  }))

  console.log("New filters", activeFilters.value, props.items)
}


watch(() => props.items, () => {
  createFilters()
}, { immediate: true })

</script>