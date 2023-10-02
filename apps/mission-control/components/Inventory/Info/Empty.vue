<template lang="pug">
InventoryInfoContainer
  div(flex="~ row grow" items="center" justify="center")
    div(text="lg" opacity="50") {{$t(`inventory.info.noItemSelected`)}}


</template>

<script setup lang="ts">
const { selectedNFT } = useInventory()

</script>