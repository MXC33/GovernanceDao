<template lang="pug">
VList(min-w="94")
  ContentDrawer()
    template(#header) Test Radio
    template(#default)
      VList(w="full")
        InputRadio(v-model="filterState[index]" v-for="list, index in testListRadio")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

  //- div(b="b-1 gray-600" pt="3" bg="black")
  //- Border only for last in list

  ContentDrawer()
    template(#header) Test Checkmark
    template(#default)
      VList(w="full")
        InputCheckbox(v-model="filterStates[index]" v-for="list, index in testListCheckbox")
          template(#default) {{ list.title }}
          template(#value) {{ list.value }}

</template>

<script lang="ts" setup>

defineProps<{
  drawerValue?: string
  drawerType?: string
}>()

const filterState = ref<boolean[]>([])
const filterStates = ref<boolean[]>([])

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