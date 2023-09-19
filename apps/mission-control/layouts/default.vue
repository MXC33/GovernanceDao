<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="0")
  Header()
  //-LayoutHeader()

  //- Used for teleports
  div(id="overlays" select="none")

  slot
</template>

<script lang="ts" setup>
</script>