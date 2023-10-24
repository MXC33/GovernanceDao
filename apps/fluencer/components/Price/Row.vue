<template lang="pug">
HList()
  div(flex-grow="1")
    slot(name="left")

  div()
    slot(name="right")

</template>

<script lang="ts" setup>

</script>