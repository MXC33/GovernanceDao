<template lang="pug">
VList(bg="gray-800"  rounded="xl" b="0.5 white opacity-20"  overflow="hidden")

  // Top detail
  CardDetail(v-if="$slots.detailTop")
    slot(name="detailTop")

  HList(flex-grow="1")
    // Main Content
    VList(p="6" space-y="6" flex-grow="1")
      slot

    // Right detail
    CardDetail(v-if="$slots.detailRight")
      slot(name="detailRight")


  // Bottom detail
  CardDetail(v-if="$slots.detailBottom")
    slot(name="detailBottom")
    
  


</template>

<script lang="ts" setup>

</script>