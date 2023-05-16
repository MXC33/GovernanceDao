<template lang="pug">

div(frame="~")
  div.iconholder(style="width: 20px")
    slot(name="icon")
  h2 {{title}}
  slot

</template>

<script setup lang="ts">
import Plus from '~/assets/icons/plus.svg'


const props = defineProps<{
  title: string
}>()

</script>

<style scoped>

</style>