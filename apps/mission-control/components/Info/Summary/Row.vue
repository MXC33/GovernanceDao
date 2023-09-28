<template lang="pug">
HList(justify="between" items="center" b="on-border:(first:t-1 b-1 white opacity-40)" px="on-border:2" py="on-border:2" :border="bordered" group)
  div(uppercase="~")
    slot(name="left")
  CorporationColorSpace(:corporation="selectedCorporation" color="$mc-accent")
    div
      slot(name="right")

</template>

<script setup lang="ts">
const { selectedCorporation } = useTaskManager()

const id = useActiveCorporation()

defineProps<{
  bordered?: true
}>()
</script>