<template lang="pug">
VList(p="3" my="lt-md:1" justify="lt-md:center" cut="b-ix-primary opacity-60 bottom-right")
  h3(color="gray-50" text="xs" uppercase="~" font="bold")
    slot(name="category")

  div(text="sm ix-primary ellipsis" whitespace="nowrap" font="bold")
    slot(name="name")

  div(text="xs")
    slot(name="value")

</template>

<script lang="ts" setup>

</script>