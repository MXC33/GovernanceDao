<template lang="pug">
VList(flex-grow="1")
  Transition(:name="subMenuOpen ? 'slide-push' : 'slide-pop'" mode="out-in")
    slot(name="sub-menu" v-if="subMenuOpen")

    slot(name="default" v-else)

</template>
  
<script setup lang="ts">
defineProps<{
  subMenuOpen: boolean
}>()
</script>