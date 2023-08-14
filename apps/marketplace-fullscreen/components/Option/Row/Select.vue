<template lang="pug">
OptionRow(font="400 on-selected:bold" :selected="selected")
  slot

  CheckmarkIcon(w="3" translate-x="lt-md:-2.7" v-if="selected")
</template>

<script setup lang="ts">
import CheckmarkIcon from '~/assets/icons/checkmark.svg'

defineProps<{
  selected?: boolean
}>()
</script>