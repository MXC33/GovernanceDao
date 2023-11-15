<template lang="pug">
VList(space-y="3")
  h4(text="3xl") {{ title }}
  VList()
    slot
  VList()
    slot(name="buttons")
    

</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()


</script>