<template lang="pug">
VList()
  VList(h="12" max-w="94" bg="ix-black" justify="center")
    HList(uppercase="~" items="center" justify="between" p="r-8" font="bold" cursor="pointer" @click.stop="dropDrawer")
      span(color="white" text="md")
        slot(name="header")
      ChevronIcon(w="5" translate-y="-0.35" fill="white" transition="opacity" :selected="drawerState" rotate="on-selected:-180deg")


  //- div(b="t-1 gray-600" w="full")
  transition(name="slide-top")
    HList(uppercase="~" v-if="drawerState")
      slot()

div(b="b-1 gray-600" bg="black" ml="-8")

</template>

<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-down.svg'

defineProps<{
  isSelected?: boolean
}>()

const drawerState = ref(false)
const dropDrawer = () => { drawerState.value = !drawerState.value }

</script>