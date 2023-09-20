<template lang="pug">
div(overflow-y="auto" scrollbar="~ mc" p="3" justify="start" grid="~ cols-2 lg:cols-3 2xl:cols-4")
  template(v-for="nft in nfts")
    InventoryListNFT(:nft="nft" @click="selectedNFT = nft" v-if="nft")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'


const { selectedNFT } = useInventory()

const { nfts } = defineProps<{
  nfts: NftFragment[]
}>()

const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('md')

watch(() => nfts, (nfts) => {
  if (isMobile.value)
    return

  if (nfts.length > 0)
    selectedNFT.value = nfts[0]
}, { immediate: true })

</script>