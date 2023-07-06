<template lang="pug">
div(grid="~ cols-3 gap-3" capitalize="~" px="3" items="center" font="bold" color="gray-50" min-h="12 on-details:8" :details="isDetails")
  div(grid="col-span-2" font="normal")
    slot(name="name")

  div(text="ellipsis")
    slot(name="value")

</template>

<script lang="ts" setup>
defineProps<{
  isDetails?: boolean
}>()
</script>