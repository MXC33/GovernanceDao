<template lang="pug">
VList()
  HList(font="bold" px="6" py="3" uppercase="~" w="53")
    span(color="white")
      slot
  div(w="full" b="b-1 gray-600 on-selected:(b-3.43 white) on-ctab:(b-3.43 ix-primary)" :selected="isSelected" :ctab="collectionTab")
</template>

<script lang="ts" setup>
defineProps<{
  isSelected?: boolean,
  collectionTab?: boolean
}>()

</script>