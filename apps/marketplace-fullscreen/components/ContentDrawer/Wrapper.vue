<template lang="pug">
VList(min-w="100% md:90")
  //- should be slotted in future, testing atm
  ContentDrawer()
    template(#header) Test Radio
    template(#default)
      VList(w="full")
        InputRadio(v-model="filterRadio[index]" v-for="list, index in testListRadio")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

  ContentDrawer()
    template(#header) Test Checkmark
    template(#default)
      VList(w="full")
        InputCheckbox(v-model="filterCheckbox[index]" v-for="list, index in testListCheckbox")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

</template>

<script lang="ts" setup>

defineProps<{
  drawerValue?: string
  drawerType?: string
}>()

const filterRadio = ref<boolean[]>([])
const filterCheckbox = ref<boolean[]>([])

const testListRadio = [
  {
    title: 'cars',
    value: 123
  },
  {
    title: 'trohpy',
    value: 123
  },
  {
    title: 'galang',
    value: 123
  },
  {
    title: 'food',
    value: 123
  },
]

const testListCheckbox = [
  {
    title: 'cars',
    value: 123
  },
  {
    title: 'trohpy',
    value: 123
  },
  {
    title: 'galang',
    value: 123
  },
  {
    title: 'food',
    value: 123
},
]

</script>