<template lang="pug">
HList(aspect="square" p="2" pos="relative" cursor="pointer" group)
  transition(name="fade-scale")
    IconSelectionCorner(pos="absolute" inset="0" v-if="isSelected")

  HList(flex-shrink="0" w="full" pos="relative" ml="1")
    IconTier(:tier="nft.tokenInfo.tier" :type="nft.tokenInfo.type" pos="absolute left--1.5" h="full" z="2")

    HList(bg="on-selected:mc-mint_20 mc-orange_10" cut="bottom-right !on-selected:b-mc-mint b-mc-orange b-opacity-40 group-hover:b-opacity-60" pos="relative" transition="all" color="on-selected:mc-mint mc-orange" overflow="hidden" w="full"  :selected="isSelected")

      TokenImage(:token="nft" transition="all" :is-Large="false" object="contain" :mt="hasMultiple ? '-1' : ''" pos="absolute" w="full" h="full" inset="0"  p="4" :key="getNftTokenKey(nft) + nft.tokenInfo.type")

      HList(v-if="hasMultiple" pos="absolute left-2 bottom-1" space-x="0.5") 
        div(text="xs") x
        p(text="xs") {{ nft.balance }}
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const { getNftTokenKey, isSameNFT } = useNFTs()
const { selectedNFT } = useInventory()

const { nft } = defineProps<{
  nft: NftFragment
}>()


const isSelected = computed(() =>
  isSameNFT(nft, selectedNFT.value)
)

const hasMultiple = computed(() => nft.balance > 1)

</script>
