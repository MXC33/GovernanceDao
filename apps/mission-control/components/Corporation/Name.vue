<template lang="pug">
div.corporation(uppercase="~" :class="[`corporation-${corporation}`]" text="ellipsis" w="[calc(100%)]" whitespace="nowrap") 
  span(color="on-colorize:$mc-accent" :colorize="colorize") {{ name }} 
</template>
  
<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';
const { t } = useI18n()
const props = defineProps<{
  corporation: Corporation,
  colorize?: boolean
}>()

const name = computed(() => {
  switch (props.corporation) {
    case 'new-lands': return t('general.newLands')
    case 'gws': return t('general.gws')
    case 'eternalab': return t('general.eternalab')
    case 'y-space': return t('general.y-space')
  }
})


</script>