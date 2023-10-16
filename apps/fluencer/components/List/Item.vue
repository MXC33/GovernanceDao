<template lang="pug">
HList(frame="~" bg="gray-800")
  div(aspect="square" pos="relative" w="24")
    slot(name="image")

  VList(flex-grow="1" p="3")
    h3(font="bold" text="lg") 
      slot(name="title")

    div(text="sm gray-200")
      slot(name="description" )

  VList()
    slot(name="button")

</template>

<script lang="ts" setup>

</script>