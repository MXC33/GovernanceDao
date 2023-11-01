<template lang="pug">
VList(bg="gray-800" frame="~ gray-500")

  // Top detail
  CardDetail(v-if="$slots.detailTop")
    slot(name="detailTop")

  HList(flex-grow="1")
    // Main Content
    VList(p="6" space-y="6" flex-grow="1" justify="on-center:center" :center="centered")

      slot

    // Right detail
    CardDetail(v-if="$slots.detailRight" flex="~ col" justify="center" items="center" flex-shrink="0" w="33%")
      slot(name="detailRight")

    // Black Detail
    CardDetail(v-if="$slots.blackDetail" flex="~ col" flex-shrink="0" w="25%")
      slot(name="blackDetail")


  // Bottom detail
  CardDetail(v-if="$slots.detailBottom")
    slot(name="detailBottom")


  


</template>

<script lang="ts" setup>
defineProps<{
  centered?: boolean
}>()
</script>