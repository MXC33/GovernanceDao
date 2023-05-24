<template lang="pug">
div(grid="~ cols-3 gap-3" b="b-1 gray-600 last:b-0" capitalize="~" px="3" items="center" font="bold" color="gray-50" min-h="12")
  div(grid="col-span-2")
    slot(name="name")

  div(text="ellipsis")
    slot(name="value")

</template>

<script lang="ts" setup>

</script>