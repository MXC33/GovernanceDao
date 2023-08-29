<template lang="pug">
HList(gap="2")
  div(:style="'background-color: '+ circleBG" rounded="full" w="4" h="4" shrink="0" mt="1.5")
  div(color="ix-white" font="bold" text="lg" pr="2" min-w="18") {{ percent }}%
  div(color="ix-white" font="bold" text="lg") {{ info }}

</template>
<script lang="ts" setup>
const { circleBG, percent, info } = defineProps<{
  circleBG?: string,
  percent?: number,
  info?: string,
}>()
</script>
<style>
</style>
