<template lang="pug">
ButtonSound(btn="~ accent-outline on-filled:accent-filled on-cant-click:disable" text="on-filled:$corporation-over-accent-color lt-md:xs" sound="sm-x" p="x-4 md:x-20" :filled="isFilled" :cant-click="isDisabled")
  slot
</template>

<script lang="ts" setup>
defineProps<{
  isFilled?: boolean
  isDisabled?: boolean
}>()
</script>