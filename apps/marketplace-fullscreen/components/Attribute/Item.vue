<template lang="pug">
VList(b="l-1 gray-400" uppercase="~" px="3")
  span(color="gray-200" text="lg")
    slot(name="header")

  HList(space-x="2" text="lg")
    slot(name="icon")

    span(color="gray-50" font="bold")
      slot()
</template>

<script lang="ts" setup>

</script>