<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="100vh")
  Header(:auto-close="false")

  VList(flex-grow="1" justify="top")

    .gradient-bg(pos="fixed left-0 right-0 top-0" h="75vh")

    //- Used for teleports
    div(id="overlays" select="none")

    VList(pos="relative" flex-grow="1")
      slot
      
</template>

<script lang="ts" setup>
</script>
<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(255, 102, 71, 0.3) 100%);
}
</style>