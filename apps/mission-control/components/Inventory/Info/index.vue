<template lang="pug">
InventoryInfoContainer(text="white opacity-80 left")
  VList(b="b-1 mc-orange_20" p="4" space-y="6")
    InventoryInfoHeader(:token="token")
    InventoryInfoFeaturesPack(:token="token" v-if="activeInventoryTab == 'cargo'")
    InventoryInfoProperties(:token="token")

  InventoryInfoOpenCargo(v-if="!isMobile" :pack="token")
  InventoryInfoViewLandmark()
</template> 

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('md')

const { activeInventoryTab } = useInventory()

const { token } = defineProps<{
  token: NftFragment
}>()

</script>