<template lang="pug">
ButtonSound(sound="md" flex="~ col" cut="bottom-right b-gray-400 hover:b-$corporation-inactive-color-80 on-selected:b-$mc-accent" :selected="isSelected" @click="selectItem" min-h="0" group pos="relative")



  VList(w="full" justify="center" aspect="square" items="center" align="center" min-h="0")

    HList(w="full")
      HList(z="-1" cut="bottom-right s-xs" color="$corporation-inactive-text-color opacity-20 on-selected:!$corporation-over-accent-color group-hover:$corporation-inactive-text-color-20" text="2.5" font="bold" bg="gray-400 group-hover:$corporation-inactive-color-80 on-selected:!$mc-accent" p="y-0.1 l-2 r-2.3" uppercase="~" v-if="$slots.flag" :selected="isSelected" pos="absolute top-0 left-0" items="start")
        slot(name="flag")

    TokenImage(:token="nftFragment" :isLarge="true" object="contain" min-h="0" z="-2" p="l-2 r-2 b-2")

  VList(flex-grow="1" space-y="1" flex-shrink="0" p="l-4 3" w="full" bg="$corporation-inactive-color-10 on-selected:!$mc-accent-10 group-hover:($corporation-inactive-color-20)" text="left lt-md:xs" b="t-1 gray-400 group-hover:$corporation-inactive-color !on-selected:$mc-accent" transition="all" uppercase="~" :selected="isSelected")

    slot(name="title")
      TitleWithIcon(icon='half-circle' font="bold" color="$mc-accent" fill="$mc-accent")
        TokenName(:token="nftFragment" :is-short="true" :no-chain-name="true")

    slot(name="details")

</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~/composables/corporations/useCorporationShop';
import type { CorporationAdjustableToken } from '~/composables/corporations/useCorporations'

const { isSameNFT } = useNFTs()
type TokenItem = CorporationAdjustableToken | CorporationShopItem

const activeItem = defineModel<TokenItem>()
const { item } = defineProps<{
  item: TokenItem
}>()

const nftFragment = computed(() => item.token)
const saleId = computed(() => (item as CorporationShopItem)?.saleId)
const activeSaleId = computed(() => (activeItem.value as CorporationShopItem)?.saleId)

const isSelected = computed(() =>
  saleId.value != undefined ?
    saleId.value == activeSaleId.value :
    isSameNFT(item?.token, activeItem.value?.token)
)

const selectItem = () => activeItem.value = item


</script>