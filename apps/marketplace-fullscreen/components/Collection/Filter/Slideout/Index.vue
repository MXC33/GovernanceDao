<template lang="pug">
VList(min-w="100% md:90")

  ContentDrawer(v-for="(item, filterIndex) in activeFilters" )
    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full")
        InputCheckbox(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value")
          template(#default) {{ option.name }}
          template(#value) {{ item.value }}

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