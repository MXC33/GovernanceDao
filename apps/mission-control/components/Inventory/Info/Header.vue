<template lang="pug">
VList(space-y="6")
  InfoStatusBox(text="left white") 
    template(#header)
      TokenName(:token="token")

    InfoBoxRow()
      InfoBox() Owned
      InfoBox() {{ token.balance }}

    InventoryInfoFeaturesFacility(:token="token" v-if="token.tokenInfo.type == 'facility'")
    InventoryInfoFeaturesLand(:token="token" v-if="token.tokenInfo.type != 'landmark' && activeInventoryTab == 'land'")

  VList(space-y="2")
    InfoHeader(color="white") Description

    div(text="white opacity-80" align="left" v-if="token.tokenInfo.description") 
      HelperWriter(:lines="token.tokenInfo.description" :key="getNftTokenKey(token)")
    
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { getNftTokenKey } = useNFTs()

const { activeInventoryTab } = useInventory()

const { token } = defineProps<{
  token: NftFragment
}>()

</script>