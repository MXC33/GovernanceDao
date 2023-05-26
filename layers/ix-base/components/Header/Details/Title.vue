<template lang="pug">
div() 
  div(text="$mc-orange" p="2") {{ title }} 
  div(border="~bottom 1 $mc-orange" w="95%")
  slot()
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>