<template lang="pug">
component(:is="icon" w="5" :up="up" rotate="on-up:-180deg")
</template>
  
<script lang="ts" setup>
import ChevronIcon from '~/assets/images/ui/icons/chevron-thin.svg'
import ChevronIconThick from '~/assets/images/ui/icons/chevron-thick.svg'
const icon = computed(() => thick ? ChevronIconThick : ChevronIcon)
const { thick } = defineProps<{
  up?: boolean,
  thick?: boolean
}>()
</script>
