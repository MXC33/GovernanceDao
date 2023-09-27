<template lang="pug">
InventoryListWrapper()
  VList(flex-grow="1")
    InventoryListNFTs(:nfts="tabNFTs")
  InventoryListOpenAvatars(v-if="activeInventoryTab == 'cargo'")
</template>

<script lang="ts" setup>
const { tabNFTs, activeInventoryTab } = useInventory()

</script>