<template lang="pug">
FoldList(justify="center" gap="3" w="full" break="md")
  TokenPicker(:is-active="isSameNFT(selectedPack, pack)" :token="pack" v-for="pack in displayPacks" @click="selectPack(pack)")
    OfferItem(:token="pack")

</template>
<script lang="ts" setup>
import type { NftFragment } from '#gql'
const { isSameNFT } = useNFTs()
const { selectedPack } = useBuyPacks()

const displayPacks: NftFragment[] = [
  { type: 'gg37medium' },
  { type: 'gg37small' }
]

onBeforeMount(() => {
  if (selectedPack.value == null)
    selectedPack.value = displayPacks[0]
})

defineProps<{
  isSelected?: boolean,
  isActive?: boolean,
}>()

const selectPack = (pack: NftFragment) => {
  selectedPack.value = pack
}

</script>
<style>
.glow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}
</style>