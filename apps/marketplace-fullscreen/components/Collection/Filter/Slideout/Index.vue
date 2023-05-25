<template lang="pug">
VList(w="100" ml="-8" mr="-3" pos="sticky top-58")
  CollectionFilterDrawer(v-for="(item, filterIndex) in activeFilters" :is-small="true" px="8")

    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full" )
        CollectionFilterRowSelect(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value")
          template(#default) {{ option.name }}

div(b="b-1 gray-600")
</template>

<script lang="ts" setup>
import type { APIFilter, Filter } from "~/composables/useCollection";
import { useCollectionSettings } from "~/composables/useCollection";

const props = defineProps<{
  items: APIFilter[]
}>()

const { activeFilters } = useCollectionSettings()


</script>