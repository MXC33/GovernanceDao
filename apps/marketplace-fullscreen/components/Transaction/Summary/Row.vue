<template lang="pug">
HList(w="full" justify="between" text="on-primary:lg" font="on-primary:bold" :primary="primary")
  div(color="gray-200") 
    slot(name="name")

  div(text="right")
    slot(name="value")
</template>

<script lang="ts" setup>
defineProps<{
  primary?: boolean
}>()
</script>