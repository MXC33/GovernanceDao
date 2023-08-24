<template lang="pug">
component(:is="icon" w="5" fill="white hover:(white opacity-80)" :up="up" rotate="on-up:-180deg")
</template>
  
<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-thin.svg'
import ChevronIconThick from '~/assets/icons/chevron-thick.svg'

const icon = computed(() => thick ? ChevronIconThick : ChevronIcon)

const { thick } = defineProps<{
  up?: boolean,
  thick?: boolean
}>()
</script>
  
  