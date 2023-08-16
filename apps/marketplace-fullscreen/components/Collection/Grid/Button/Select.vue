<template lang="pug">
button(bg="gray-200 opacity-40 hover:opacity-100" backdrop="~ blur-lg" transition="all" w="10" h="10" rounded="full" pos="relative")
  Plus(w="6" pos="absolute-center" fill="white" v-if="!isSelected")
  Checkmark(w="4" pos="absolute-center" v-else)

</template>

<script lang="ts" setup>
import Plus from '~/assets/icons/plus-new.svg'
import Checkmark from '~/assets/icons/checkmark.svg'



const isSelected = defineModel<boolean>()

</script>

