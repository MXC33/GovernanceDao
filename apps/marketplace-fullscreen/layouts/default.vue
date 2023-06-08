<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="0")
  Header()
  VList()
    PageHeader()

    Cart()

    //- Used for teleports
    div(id="overlays" select="none")

    VList(pos="relative")
      slot
      
</template>

<script lang="ts" setup>
</script>
