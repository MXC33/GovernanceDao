<template lang="pug">
VList(min-w="94")
  ContentDrawer()
    template(#header) Test Radio
    template(#default)
      VList(w="full")
        InputRadio(v-model="adjustedState[index]" v-for="list, index in testListRadio")
          template(#value) {{ list.value }}

  //- div(b="b-1 gray-600" pt="3" bg="black")
  //- Border only for last in list

  ContentDrawer()
    template(#header) Test Checkmark
    template(#default)
      VList(w="full")
        InputCheckbox(v-model="adjustedStates[index]" v-for="list, index in testListCheckbox")
          template(#value) {{ list.value }}

</template>

<script lang="ts" setup>

defineProps<{
  drawerValue?: string
  drawerType?: string
}>()

const adjustedState = ref<boolean[]>([])
const adjustedStates = ref<boolean[]>([])

const testListRadio = [
  {
    value: 'cars'
  },
  {
    value: 'trohpy'
  },
  {
    value: 'galang'
  },
  {
    value: 'food'
  },
]

const testListCheckbox = [
  {
    value: 'cars'
  },
  {
    value: 'trohpy'
  },
  {
    value: 'galang'
  },
  {
    value: 'food'
  },
]

</script>