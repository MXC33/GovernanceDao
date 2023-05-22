<template lang="pug">
VList(min-w="100% md:90")
  //- should be slotted in future, testing atm
  ContentDrawer()
    template(#header) Owner
    template(#default)
      VList(w="full")
        InputRadio(v-model="filterRadio['owner']" v-for="list, index in listRadio")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

  ContentDrawer(v-for="item in items" )
    template(#header) {{item.trait_type}}
    template(#default)
      VList(w="full")
        InputCheckbox(v-model="filterCheckbox[list+index]" v-for="list, index in item.value")
          template(#default) {{ list }}
          template(#value) 1
</template>

<script lang="ts" setup>

import type {Filters} from "~/composables/useCollection";

defineProps<{
    items: Filters[]
}>()

const filterRadio = ref<boolean[]>([])
const filterCheckbox = ref<boolean[]>([])

watch(filterRadio, (newValue, oldValue) => {
    console.log(`filterRadio changed from ${oldValue} to ${newValue}`)
})
watch(filterCheckbox, (newValue, oldValue) => {
    console.log(`filterCheckbox changed from ${oldValue} to ${newValue}`)
})

const listRadio = [
  {
    title: 'All',
    value: 0
  },
  {
    title: 'Me',
    value: 0
  }
]
</script>