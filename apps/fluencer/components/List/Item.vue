<template lang="pug">
div(frame="~ gray-500" bg="gray-800" flex="~ md:row col" gap="md:4" )
  HList(flex-grow="1")
    div(aspect="square" pos="relative" w="24")
      slot(name="image")

    VList(flex-grow="1" p="3" justify="center")
      h3(font="bold" text="lg") 
        slot(name="title")

      div(text="sm gray-200")
        slot(name="description" )

  VList(justify="center" pr="md:4" v-if="$slots.info || $slots.button" pos="relative" z="5")
    slot(name="info")
    slot(name="button")

</template>

<script lang="ts" setup>

</script>