<template lang="pug">
PopupWrapper()
  VList(gap="2" w="full md:auto")
    VList(b="1 $mc-accent" bg="mc-black_20")
      HList(flex="~ row" items="center" align="center" uppercase="~" text="sm md:base $mc-accent" font="bold" b="b-1 $mc-accent" px="4" py="2")
        TitleWithPointer(v-if="corporation != 'haveblue'") {{$t(`wallet.payments.chooseMethod`)}} 
        TitleWithPointer(v-else color="white") {{$t(`wallet.payments.chooseMethod`)}} 


      VList(px="4" py="4" gap="2")

        WalletButtonTokens(v-for="item in paymentToken" :token-type="item" @click="chosenPaymentCurrency(item)" :is-selected="isSelected(item)")
          template(#price) {{ item }}

    div(grid="~ cols-2" w="full" gap="2")
      ButtonSound(grid="~ col-span-1" btn="~ accent-outline" sound="sm" cut="bottom-right" @click="activePopup = null") {{ $t(`general.cancel`) }}
      ButtonSound(grid="~ col-span-1" btn="~ accent-filled" sound="sm" cut="bottom-right" @click="onPurchase") {{ $t(`general.purchase`) }}


</template>
<script lang="ts" setup>
import type { CorporationShopItem, Currency } from '~~/composables/corporations/useCorporationShop';

defineProps<{
  shopItem?: CorporationShopItem
}>()

const activePopup = usePopups()
const { corporation } = useCorporations()
const { buyNFT } = useBuyNFTs()
const { activeShopItem, gotoCompleted, chosenCurrency } = useCorporationShop()
const { purchaseRover } = useYSpaceContracts()

const paymentToken = activeShopItem.value.paymentMethod

const chosenPaymentCurrency = (item: Currency) => chosenCurrency.value = item
const isSelected = (item: Currency) => chosenCurrency.value == item


const onPurchaseRover = async () => {
  const didBuy = await purchaseRover(activeShopItem.value, chosenCurrency.value)
  if (didBuy) {
    activePopup.value = null
    return gotoCompleted()
  }
  return
}

const onPurchase = async () => {
  if (!activeShopItem.value)
    return

  if (activeShopItem.value.type == 'rover') {
    return await onPurchaseRover()
  }
  const didBuy = await buyNFT(activeShopItem.value, chosenCurrency.value)
  activePopup.value = null
  if (didBuy)
    return gotoCompleted()
}

</script>