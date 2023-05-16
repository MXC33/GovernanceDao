<template lang="pug">
VList(b="l-1 gray-400" uppercase="~" px="3" my="lt-md:1" justify="lt-md:center")
  span(color="gray-200" text="xs md:lg")
    slot(name="header")

  HList(space-x="2" text="xs md:lg")
    slot(name="icon")

    span(color="gray-50" font="bold")
      slot()
</template>

<script lang="ts" setup>

</script>