<template lang="pug">
VList(space-y="2")
  div(bg="$mc-accent" color="$corporation-over-accent-color" font="bold" p="2" uppercase="~" cut="top-right")
    slot(name="header")

  slot

</template>

<script lang="ts" setup>
</script>