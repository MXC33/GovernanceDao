<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="50vh" justify="center" items="center")
  .gradient-bg(pos="fixed left-0 right-0 top-12 md:top-16" h="75vh")

  VList(pos="relative" text="left" justify="center" items="center" space-y="10" max-w="3xl")
    div(w="38")
      slot(name="icon")

    header(space-y="4")
      h1(text="ix-orange 4xl center" font="bold") 
        slot(name="title")

      div
        slot(name="description")

</template>

<script lang="ts" setup>

</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(255, 102, 71, 0.3) 100%);
}

.gradient-bg-account {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(99, 99, 99, 0.5) 100%);
}
</style>
