<template lang="pug">
VList(ml="-4 md:(-8)" mr="-4 md:(-3)" pos="md:sticky top-$filter-header-offset"  overflow-y="scroll" w="md:100" max-h="[calc(100vh-var(--filter-header-offset))]" transition="all")
  Drawer(v-for="(item, filterIndex) in activeFilters" :is-small="true")

    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full" b="b-1 gray-600")
        CollectionFilterRowSelect(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value" px="8")
          template(#default) {{ option.name }}

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