<template lang="pug">
TokenIFrame(v-if="contract==geoLotteryAddress" :token="token")
TokenImage(v-else-if="displayStillImage" :token="token" :is-large="(!icon && isLarge) || image" :key="componentKey" :cover="!contain")
TokenVideo(v-else :token="token" :is-large="isLarge" h="full" inset="0" :key="componentKey + 'video'" :fill="contain ? 'contain' : 'cover'")
</template>

<script lang="ts" setup>
import type { AnyToken } from '~/composables/Token/useTokens';

const { getChain } = useWallet()
const props = defineProps<{
  token: AnyToken,
  isLarge?: boolean,
  icon?: boolean,
  contain?: boolean,
  image?: boolean
}>()

const getTokenAttribute = (item: AnyToken, attribute: string) => {
  if (isIXToken(item))
    return item?.attributes?.find((attr) =>
      attr.key?.toLowerCase() == attribute.toLowerCase()
    )?.value_search

  return item.tokenInfo?.type
}

const geoLotteryAddress = geoLotteryRewardAddress[getChain('polygon')]?.toLowerCase()

const contract = computed(() => props.token?.contract ?? props.token?.collection)

const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge', 'voucher', 'gg2', 'rover-key', 'gg-energy', 'gg2-energy', 'gg3-energy', 'gg4-energy', 'gg5-energy', 'landmark']

const displayStillImage = computed(() => {
  if (props.image)
    return true

  const tokenType = getTokenAttribute(props.token, 'type') ?? ""

  return imageTokens.includes(tokenType) || !tokenHasVideo(props.token)
})

const componentKey = computed(() => props.token && getTokenKey(props.token))
</script>