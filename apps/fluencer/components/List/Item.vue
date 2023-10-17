<template lang="pug">
HList(frame="~" bg="gray-800")
  div(aspect="square" pos="relative" w="24")
    slot(name="image")

  VList(flex-grow="1" p="3" justify="center")
    h3(font="bold" text="lg") 
      slot(name="title")

    div(text="sm gray-200")
      slot(name="description" )

  VList(justify="center" pr="6")
    slot(name="info")
    slot(name="button")

</template>

<script lang="ts" setup>

</script>