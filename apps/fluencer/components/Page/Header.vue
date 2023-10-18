<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="50vh" justify="center" items="center" px="4 md:8")

  VList(pos="relative" text="left" justify="center" items="center" space-y="10" max-w="3xl")
    .flu-header-image(w="52" h="35" pos="relative")
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
.flu-header-image img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  object-fit: contain;
  height: 100%;
  width: 100%;
}
</style>
