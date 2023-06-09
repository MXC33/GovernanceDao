<template lang="pug">
button(bg="gray-200 opacity-60 hover:opacity-100" transition="all" wh="10" rounded="full" pos="relative" backdrop="~ blur-md")
  Plus(w="5" pos="absolute-center" v-if="!isSelected")
  Checkmark(w="5" pos="absolute-center" v-else)

</template>

<script lang="ts" setup>
import Plus from '~/assets/icons/plus.svg'
import Checkmark from '~/assets/icons/checkmark.svg'



const isSelected = defineModel<boolean>()

</script>

