<template lang="pug">
CorporationPage(@click-back="goBack()")
  template(#title)
    TitleWithPointer {{ $t(`corporations.${corporationRouteI18n}.title`) }}

  template(#default)
    CorporationActionSelect()

      CorporationButton(:page="page" v-for="page in pages")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
import type { ContractTier } from '~~/composables/NFTs/useContracts';

const { goBack } = useCorporationRoute()
const { corporationRouteI18n } = useCorporationRoute()

const { execute: fetchStakedGenesisNFTData } = useStakeGenesisNFTData()
const { execute: fetchStakedMCNFTData, data: stakedMCNFTData } = useStakeMCNFTData()
const { execute: fetchTokens } = useTokenData()

await Promise.all([
  fetchTokens(),
  fetchStakedMCNFTData(),
])

const allowedTiers: ContractTier[] = ['apollo', 'artemis', 'helios', 'chronos']

const allContracts = computed(() => stakedMCNFTData.value.filter((item) => allowedTiers.includes(item.token.tokenInfo?.tier as ContractTier)).map((item) => item.amount > 0))

await Promise.all([fetchStakedGenesisNFTData()])

definePageMeta({
  layout: 'corporation'
})

const pages = ['stake-genesis', 'stake-contract', 'burn']

</script>
