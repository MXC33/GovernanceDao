<template lang="pug">
Slideout(:title="inventoryTitle" :is-open="selectedNFT != null" @close="selectedNFT = null")
  div(p="x-2 b-4" space-y="4")
    InventoryInfo(:token="selectedNFT" v-if="selectedNFT" :key="getNftTokenKey(selectedNFT)")
    InventoryImage(:disable-bg-animation="true")

  InventoryInfoOpenCargo(:pack="selectedNFT" v-if="selectedNFT")

</template>

<script setup lang="ts">
const { selectedNFT } = useInventory()
const { getNftTokenKey } = useNFTs()

const inventoryTitle = computed(() => {
  const nft = selectedNFT.value
  if (!nft)
    return ""

  return `${nft.tokenInfo.type} ${nft.tokenInfo.tier ?? ''}`
})
</script>