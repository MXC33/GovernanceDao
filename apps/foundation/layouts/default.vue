<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="100vh")
  Header(:auto-close="false")

  HeaderSubnavigation()

  VList(flex-grow="1" justify="top")
    //- Used for teleports
    div(id="overlays" select="none")

    VList(pos="relative" flex-grow="1" w="full" max-w="300" mx="auto" px="4 lg:8" pb="12")
      slot
      
</template>

<script lang="ts" setup>
</script>
