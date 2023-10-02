<template lang="pug">
CorporationItemsAndDetailGridItem(v-model="activeItem" :item="item")
  template(#flag)
    div(v-if="item.price == 99999")
      span() {{ $t(`general.shop.out-stock`) }}
    div(v-else)
      span(v-if="balance > 0") {{ $t(`general.shop.owned`) }}
      span(v-else-if="!item.inStock") {{ $t(`general.shop.out-stock`)}}
      span(v-else-if="balance == 0") {{ $t(`general.shop.in-stock`)}}

  template(#details)

    div(color="$corporation-over-accent" font="normal" v-if="item.subTitle") {{ item.subTitle }}

    //- div(color="$corporation-over-accent" font="normal" v-else-if="")

    HList(font="normal")
      div(color="$corporation-color-over-accent") {{ $t(`general.priceColon`) }}
      div(color="$mc-accent" ml="2")
        CorporationShopPriceTag(:price="item.price", :paymentMethod="item.displayPrice")

</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';

const { item } = defineProps<{
  item: CorporationShopItem,
}>()

const activeItem = defineModel<CorporationShopItem>()

const { balanceOfToken } = useUserData()

const balance = computed(() => {
  const { tokenInfo: { type, tier } } = item.token
  const balanceOfStakedToken = useStakedDataBalance(type, tier)
  return balanceOfToken(item.token) + balanceOfStakedToken.value
})

</script>
