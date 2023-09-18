<template lang="pug">
TokenImage(v-if="displayStillImage" :token="token" :is-large="(!icon && isLarge) || image" :key="componentKey")

TokenVideo(v-else :token="token" :is-large="isLarge" h="full" inset="0" :key="componentKey + 'video'")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'



const { getNftTokenKey } = useNFTs()

const props = defineProps<{
  token: NftFragment,
  isLarge?: boolean,
  icon?: boolean
  image?: boolean
}>()

const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge', 'voucher', 'gg2', 'rover-key', 'gg-energy', 'gg2-energy', 'gg3-energy', 'gg4-energy', 'landmark']

const displayStillImage = computed(() => props.icon || props.image || imageTokens.includes(props.token.tokenInfo.type))


const componentKey = computed(() => props.token && getNftTokenKey(props.token))



</script>