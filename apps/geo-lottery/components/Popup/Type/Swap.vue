<template lang="pug">
Popup()
  template(#content)
    VList(flex-grow="1" p="4" text="md" font="normal")
      SwapToken(m-y="2" :order="tokenSwapOrder === 'IXT-AGOLD' ? '1' : '3'" v-model="ixtValue" :disabledValue="tokenSwapOrder !== 'IXT-AGOLD' ? aGoldValue.value : null")
        template(#icon)
          IxtCircleBlackIcon(w="10")
        template(#title) Ix Token
        template(#balance) BALANACE: {{ roundToDecimals(ixtBalance, 2) }} IXT

      VList(justify="center" items="center" m-y="2" order="2")
        div(flex="~" justify="center" items="center" w="12" h="12" cursor="pointer" bg="ix-pink hover:opacity-80" rounded="full" @click="swapTokenOrder")
          SortArrowsIcon.ease-in.duration-200(w="5" :rotate="tokenSwapOrder === 'IXT-AGOLD' ? '0' : '180'")

      SwapToken(m-y="2" :order="tokenSwapOrder === 'IXT-AGOLD' ? '3' : '1'" v-model="aGoldValue" :disabledValue="tokenSwapOrder === 'IXT-AGOLD' ? ixtValue.value : null")
        template(#icon)
          AstroGoldCircleYellowIcon(w="10")
        template(#title) Astro Gold
        template(#balance) BALANACE: {{ roundToDecimals(astroGoldBalance, 2) }} AGOLD

  template(#footer)
    ButtonItem(:value="'pink'" :text="'Swap'" @click="onSwap()" :loading="isLoading")

</template>
<script lang="ts" setup>
import IxtCircleBlackIcon from '~/assets/icons/token/ixt-circle-black.svg'
import AstroGoldCircleYellowIcon from '~/assets/icons/token/astro-gold-circle-yellow.svg'
import SortArrowsIcon from '~/assets/icons/sort-arrows.svg'

import { useSwapTokens } from "~/composables/useSwapTokens";
import { useAstroGoldContract } from "@ix/base/composables/Contract/useAstroGoldContract";
import { useLottery } from "~/composables/useLottery";

const { walletState } = useWallet()
const { refreshIXTBalance, ixtBalance } = useIXTContract()
const { refreshAstroGoldBalance, astroGoldBalance } = useAstroGoldContract()
const { displayPopup, popup } = usePopups()

refreshIXTBalance()
refreshAstroGoldBalance()

const { ixtValue, aGoldValue, tokenSwapOrder, swapTokenOrder, swapIXTtoAGOLD, swapAGOLDtoIXT } = useSwapTokens()
const { loading: isLoading, execute: swapRequest } = useContractRequest(() =>{
  if (tokenSwapOrder.value === 'IXT-AGOLD')
    return swapIXTtoAGOLD(ixtValue.value.value)
  else
    return swapAGOLDtoIXT(aGoldValue.value.value)
})

const onSwap = async () => {
  const swap = await swapRequest()

  if (swap) {
    displayPopup({
      type: 'popup-type-swap-success',
      tokenSwapOrder: tokenSwapOrder.value,
      value: tokenSwapOrder.value === 'IXT-AGOLD' ? ixtValue.value.value : aGoldValue.value.value,
      backModal: popup.value?.backModal || null,
      parentBackModal: popup.value?.parentBackModal || null
    })

    ixtValue.value.value = 1
    aGoldValue.value.value = 1
    tokenSwapOrder.value = 'IXT-AGOLD'
  }
}

</script>
