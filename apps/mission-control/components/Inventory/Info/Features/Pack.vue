<template lang="pug">
InfoGroup() 
  template(#header) 
    span(color="white") Contents and Probabilities

  template(#default)
    VList(space-y="4" v-if="packItems?.length > 0") 
      article {{ title }}

      VList(space-y="1") 
        InventoryInfoFeaturesPackItem(:token="item" v-for="item in packItems")
</template>

<script setup lang="ts">
import type { NftFragment, TokenProbabilityFragment } from '#gql'

const { token } = defineProps<{
  token: NftFragment
}>()

const { data, execute: fetchGGContents } = useGravityGradePackContentData({ type: token.tokenInfo.type, tier: token.tokenInfo.tier })

await fetchGGContents()

const packItems = computed<TokenProbabilityFragment[]>(() => data.value)

const title = computed(() => {
  switch (token.tokenInfo.type) {
    case 'loot-crate':
      return 'When opening a loot crate you have the chance of receiving two to five assets. See the probabilities below.'

    default:
      return `The percentage likelihood of acquiring an asset when opening the ${token.tokenInfo.title}.`

  }
})

</script>