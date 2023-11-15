<template lang="pug">
VList(disable="on-active:active" :active="disabled")
  slot

</template>

<script lang="ts" setup>
defineProps<{
  disabled: boolean
}>()
</script>