<template lang="pug">
VList(space-y="6" flex-grow="1" justify="start")
  slot(name="default" v-if="hasItems")

  p(v-else text="white" opacity="60" uppercase="~")  
    slot(name="noItems")

</template>

<script setup lang="ts">

defineProps<{
  hasItems: boolean
}>()

</script>
