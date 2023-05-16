<template lang="pug">
VList(min-w="94")
  ContentDrawer()
    template(#header) Test Drawer
    template(#default)
      VList(w="full")
        InputRadio(v-model="adjustedState[index]" v-for="list, index in testListFilters")
          template(#value) {{ list.value }}

  //- div(b="b-1 gray-600" pt="3" bg="black")
  //- Border only for last in list

</template>

<script lang="ts" setup>

defineProps<{
  drawerValue?: string
}>()

const adjustedState = ref<boolean[]>([])

const testListFilters = [
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