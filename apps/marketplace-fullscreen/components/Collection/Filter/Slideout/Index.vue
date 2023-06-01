<template lang="pug">
VList(w="100" ml="-8" mr="-3" pos="sticky top-66 md:(sticky top-52)" overflow-y="scroll" h="273")
  CollectionFilterDrawer(v-for="(item, filterIndex) in activeFilters" :is-small="true")

    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full" b="b-1 gray-600")
        CollectionFilterRowSelect(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value" px="8")
          template(#default) {{ option.name }}
        div(h="4")
      div(mt="4")
      
</template>

<script lang="ts" setup>
import type { APIFilter } from "~/composables/useCollection";
import { useCollectionSettings } from "~/composables/useCollection";

defineProps<{
  items: APIFilter[]
}>()

const { activeFilters } = useCollectionSettings()

</script>