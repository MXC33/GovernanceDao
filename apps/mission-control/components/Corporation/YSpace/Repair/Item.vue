<template lang="pug">
ListItemOutline(:accented="true" :is-large="true" text="normal" :item="item" @click="activeRepairItem = item" :is-selected="isSelected")
  template(#iconLeft)
    TokenImage(:token="item.token" :key="getNftTokenKey(item.token)")

  template(#default)
    VList(p="l-2")
      TitleWithIcon(icon="half-circle" fill="$mc-accent" font="bold" color="$mc-accent") {{ item.token.tokenInfo.tier }}

      div(align="left") {{ $t(`corporations.y-space.general-msg.location`) }} {{ location }}

      HList(space-x="2" v-if="item.token.tokenInfo.status == 'worn' || item.token.tokenInfo.status == 'damaged'")
        TitleWithIcon(icon="cut-corner" :fill="colors" :color="colors" state="active" w="auto") {{ item.token.tokenInfo.status }}
        HList(align="left" translate-y="0.075em") / {{ staticPrice }}
        TokenName(:is-short="true" :no-overflow="true" :key="payToken.token.tokenId" :token="payToken.token")

      HList(space-x="2" v-else)
        TitleWithIcon(icon="cut-corner" :fill="colors" :color="colors" state="active" w="auto") {{ item.token.tokenInfo.status }}


  template(#rightSlot v-if="isRepairable")
    VList(pr="4")
      ButtonAddRemove(@click="toggleRepairItem(item)" :is-active="itemIsAdded(item)")
    
</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
import type { CorporationRepairItem } from '~~/composables/corporations/useCorporationService';

const { hasStakedGenesis } = useCorporationRepair()
const { getNftTokenKey } = useNFTs()

const props = defineProps<{
  isSelected?: boolean
  item: CorporationRepairItem
  payToken?: CorporationPaymentToken
}>()

const location = computed(() => {
  const { getTileName } = useTiles()
  //@ts-ignore
  return props.item.token?.tile ? getTileName(props.item.token?.tile) : 'INVENTORY'
})


const isRepairable = computed(() => props.item.token.tokenInfo.status == 'damaged' || props.item.token.tokenInfo.status == 'worn')

const staticPrice = computed(() => {

  if (hasStakedGenesis.value)
    return 0
  const acPrice = getRoverACRepairPrice(props.item.token.tokenInfo.status)
  const ixtPrice = getRoverIXTRepairPrice(props.item.token.tokenInfo.status)

  const price = payToken.value.token.tokenInfo.type == 'astro-credit' ? acPrice : ixtPrice

  return price
})

const { toggleRepairItem, itemIsAdded, activeRepairItem, payToken } = useCorporationRepair()

const colors = computed(() => {
  switch (props.item.token.tokenInfo.status) {
    case 'pristine':
      return 'mc-success'
    case 'worn':
      return 'mc-warning'
    case 'damaged':
      return 'mc-red'
    case 'wrecked':
      return 'gray_light'
  }
})

</script>
