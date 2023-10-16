<template lang="pug">
VList()
  slot(name="header")

  VList(pos="relative" px="8" space-y="8")
    slot


</template>

<script lang="ts" setup>
</script>
