<template lang="pug">
TokenImage(v-if="displayStillImage" :token="token" :is-large="(!icon && isLarge) || image" :key="componentKey")
TokenVideo(v-else :token="token" :is-large="isLarge" h="full" inset="0" :key="componentKey + 'video'" :fill="contain ? 'contain' : 'cover'")
</template>

<script lang="ts" setup>
import type { AnyToken } from '~/composables/Token/useTokens';
const props = defineProps<{
  token: AnyToken,
  isLarge?: boolean,
  icon?: boolean,
  contain?: boolean,
  image?: boolean
}>()

console.log("TOKEN", props.token)


const getTokenAttribute = (item: AnyToken, attribute: string) => {
  if (isIXToken(item))
    return item?.attributes?.find((attr) =>
      attr.key?.toLowerCase() == attribute.toLowerCase()
    )?.value_search

  return item.tokenInfo?.type
}
const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge', 'voucher', 'gg2', 'rover-key', 'gg-energy', 'gg2-energy', 'gg3-energy', 'gg4-energy', 'landmark']

const displayStillImage = computed(() => {
  const tokenType = getTokenAttribute(props.token, 'type') ?? ""

  return imageTokens.includes(tokenType) || !tokenHasVideo(props.token)
})

const componentKey = computed(() => props.token && getTokenKey(props.token))
</script>