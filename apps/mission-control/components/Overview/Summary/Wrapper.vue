<template lang="pug">
VList(text="sm" space-y="2" p="l-5 b-8")
  div(color="mc-white_60" font="bold" text="xs" b="b-1 mc-white_40" p="b-1" uppercase="~") {{ $t(`overview.tileSummary`) }}

  slot

</template>

<script setup lang="ts">

</script>