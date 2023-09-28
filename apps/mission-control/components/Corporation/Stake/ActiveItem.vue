<template lang="pug">
div(flex="~ col" space-y="6")
  div(grid="~ cols-2 gap-3")
    div(corners="~ accent" p="3")
      TokenImage(:token="item" :is-large="true" min-h="0" aspect="square")

    InfoStatusBox()
      template(#header) {{ item.token.tokenInfo.type }} {{ item.token.tokenInfo.tier }}
      div(grid="~ cols-2 gap-2")
        InfoBox() {{ $t(`corporations.new-lands.stake.detail-titles.status`) }}
        InfoBox() 
          span(v-if="item.staked" font="bold" color="$mc-accent") {{ $t(`corporations.new-lands.stake.detail-titles.staked`) }} 
          span(v-else-if="tokenOwnedState(item.token) == 'pending'" font="bold" color="$mc-accent") {{ $t(`corporations.new-lands.stake.detail-titles.pending`) }}
          span(v-else opacity="50") {{ item.amount > 0 ? 'UNSTAKED' : 'N/A'}} 

      InfoBox(v-html="$t(`corporations.new-lands.stake.detail-titles.locking-period`)")

      InfoBox(v-html="$t(`general.itemsOwned`, item.token.balance)")

  VList(space-y="4") 
    InfoGroup()
      template(#header) {{$t('general.description')}}
      template(#default) 
        div.stake-details(v-html="$t(`corporations.new-lands.stake.details.${item.token.tokenInfo.type}.description`)")

    InfoGroup()
      template(#header) {{ $t(`corporations.new-lands.stake.headers.staking-description`) }}

      template(#default) 
        div.stake-details(v-html="$t(`${localeKey}.staking-description`)")

    InfoGroup(v-if="item.token.tokenInfo.type != 'genesis'") 
      template(#header) {{$t(`corporations.new-lands.stake.headers.attributes`)}}

      template(#default) 
        div(grid="~ cols-4 gap-2") 
          InfoAttribute(v-for="attribute in data?.tokenInfo.attributes")
            template(#header) {{attribute.traitType }}
            template(#default) {{ attribute.value }}

</template>
    
<script lang="ts" setup>
import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake'
const { getNftTokenKey } = useNFTs()
const id = useActiveCorporation()
const { tokenOwnedState } = useMaybeStakedTokenState()

const localeKey = computed(() => `corporations.${id.value}.stake.details.${getNftTokenKey(props.item.token, '.')}`)

const props = defineProps<{
  item: CorporationStakeItem
}>()

const { data, execute: fetchTokenInfo } = useTokenInfo(props.item.token.tokenId, props.item.token.contract)

await fetchTokenInfo()

</script>

<style>
span strong {
  color: var(--mc-white)
}

.stake-details span {
  color: var(--mc-accent)
}
</style>