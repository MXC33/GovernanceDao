<template lang="pug">
button(bg="gray-200 opacity-40 hover:opacity-100 on-selected:ix-ne" backdrop="~ blur-lg on-selected:none" transition="all" w="10" h="10" rounded="full" pos="relative" :selected="isSelected" @click="toggle")
  Plus(w="6" pos="absolute-center" fill="white" v-if="!isSelected")
  Checkmark(w="4" fill="white" pos="absolute-center" v-else)

</template>

<script lang="ts" setup>
import Plus from '~/assets/icons/plus-new.svg'
import Checkmark from '~/assets/icons/checkmark.svg'

const isSelected = defineModel<boolean>()

const toggle = () => {
  isSelected.value = !isSelected.value
}

</script>

