<template lang="pug">
button(bg="gray-200 opacity-40 hover:opacity-100" backdrop="~ blur-lg" transition="all" wh="8.5" rounded="full" pos="relative" translate-y="0.8")
  Plus(w="4" pos="absolute-center" v-if="!isSelected")
  Checkmark(w="4" pos="absolute-center" v-else)

</template>

<script lang="ts" setup>
import Plus from '~/assets/icons/plus.svg'
import Checkmark from '~/assets/icons/checkmark.svg'



const isSelected = defineModel<boolean>()

</script>

