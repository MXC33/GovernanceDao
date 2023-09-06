<template lang="pug">
div(grid="~ md:cols-12" w="full" min-h="200px" p="4" bg="ix-pink opacity-10" b="1 ix-pink" rounded="2xl" gap="5")
  div(col="start-1 span-4")
    div(v-if="$slots.title" font="bold" text="text-lg" color="ix-pink")
      slot(name="title")
    div(v-if="$slots.subtitle" text="2xl" color="ix-white" font="bdrA3mik")
      slot(name="subtitle")
  div(col="start-5 span-8" flex="~" items="center" justify="end")
    slot(name="content")

</template>
<script lang="ts" setup>
</script>
<style>
</style>
