<template lang="pug">

div(frame="~" px="6" py="4")
  HList.collapseHeader(items="center" font="foundry")
    div.collapseHeaderIcon(w="5" mr="2")
      slot(name="icon")
    div.collapseHeaderTitle(flex-grow="1" font="bold" uppercase="~" color="white" text="sm md:lg") {{title}}
    div.collapseHeaderArrow(w="6" ml="2"  self="stretch" flex="~" items="center" cursor="pointer" @click="BodyShow = !BodyShow")
      KeyboardArrowUp(v-if="BodyShow")
      KeyboardArrowDown(v-else)

  div.collapseBody(v-if="BodyShow" mt="4")
    slot

</template>

<script setup lang="ts">
import {ref} from "vue";
import KeyboardArrowUp from '~/assets/icons/keyboard_arrow_up.svg'
import KeyboardArrowDown from '~/assets/icons/keyboard_arrow_down.svg'

const BodyShow = ref(true);

const props = defineProps<{
  title: string
}>()

</script>

<style scoped>

</style>