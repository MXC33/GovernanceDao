<template lang="pug">
VList(b="l-1 gray-400" uppercase="~" px="2 md:3" my="lt-md:1" justify="lt-md:center")
  span(color="gray-200" text="xs md:base")
    slot(name="header")

  HList(space-x="2" text="xs md:base" items="center" flex-grow="1")
    slot(name="icon")

    span(color="gray-50" font="bold" translate-y="0.2")
      slot()
</template>

<script lang="ts" setup>

</script>