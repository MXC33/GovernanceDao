<template lang="pug">
VList(min-w="100% md:90")
  //- should be slotted in future, testing atm
  ContentDrawer()
    template(#header) Owner
    template(#default)
      VList(w="full")
        InputRadio(v-model="collectionOwners" :model-value="list.title" :is-selected="isSelected(list)" v-for="list in listRadio")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

  ContentDrawer(v-for="item in items" )
    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full")
        InputCheckboxMultiple( :value="option" @checked="updateFilter(item.trait_type, $event)" v-for="option in item.value")
          template(#default) {{ option }}
          template(#value) 0
</template>

<script lang="ts" setup>

import type {Filter} from "~/composables/useCollection";
import {onMounted} from "vue";
import {useCollectionSettings} from "~/composables/useCollection";

const props = defineProps<{
    items: Filter[]
}>()

const { collectionOwners, activeFilters } = useCollectionSettings()

const isSelected = (list) => {
    console.log('collectionOwners.value == list.title',  collectionOwners.value, list.title, collectionOwners.value == list.title)
    return collectionOwners.value == list.title
}
const updateFilter = (trait_type, value) => {
      activeFilters.value[trait_type] = activeFilters.value[trait_type] || []
      const index = activeFilters.value[trait_type].indexOf(value)
      if (index === -1) {
          activeFilters.value[trait_type].push(value)
      } else {
          activeFilters.value[trait_type].splice(index, 1)
      }
      if (activeFilters.value[trait_type].length === 0) {
          delete activeFilters.value[trait_type]
      }
}

watch(collectionOwners, (newValue, oldValue) => {
    console.log(`collectionOwners changed `, collectionOwners.value)
})
watch(activeFilters, (newValue, oldValue) => {
    console.log(`activeFilters changed  to `, activeFilters.value)
},{
    deep: true
})
onMounted(() => {
    console.log('items', props.items)
});
const listRadio = [
  {
    title: 'All',
    value: 0
  },
  {
    title: 'Me',
    value: 1
  }
]
</script>