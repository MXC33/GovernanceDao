<template lang="pug">
VList(px="6" space-y="6" mb="6")
  span(font="bold" grid="col-span-4")
    slot(name="header")
  div(grid="~ cols-4 gap-4")
    button(sound="sm" cut="bottom-right sm b-gray-400" px="4" py="2" grid="col-span-2 on-full:col-span-4" text="sm" :full="isFull")
      slot(name="button")

</template>

<script lang="ts" setup>
defineProps<{
  isFull?: boolean
}>()
</script>