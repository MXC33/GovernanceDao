<template lang="pug">
CorporationBorderBox(:title="$t(`corporations.astro-cap.swap-funds`)"  cut="top-right s-lg b-$mc-accent")
  template(#default)
    VList(flex-grow="1" space-y="4")
      CorporationSwapExchangeMessage(p="b-2")

      VList(scrollbar="~ mc" space-y="3" flex-grow="1")
        CorporationSwapExchangeToken(direction="from", v-model="state.from" key="from")

        VList(w="full" items="center")
          button(btn="~ accent-filled" p="x-4 y-3" cut="top-left-bottom-right" text="$corporation-over-accent-color" @click="changeSwapDirection") 
            SwapArrows(w="5")

        CorporationSwapExchangeToken(direction="to", v-model="state.to" key="to")

  template(#outsideScroll)
    CorporationCartWrapper()
      CorporationCartRow(grid="")
        HelperTimeFrame(:is-light="true" w="full" alignment="center")
          HList(color="$mc-accent" justify="center" font="normal" tex="xs") {{ $t(`corporations.astro-cap.swap.swap-back`) }}

      CorporationCartRow()
        HList(color="gray-500" text="sm" space-x="4" uppercase="~" items="center" justify="center" align="center")

          TokenName(:token="state.from.token" color="$mc-accent" font="bold" :no-overflow="true")

          span TO

          TokenName(:token="state.to.token" color="$mc-accent" font="bold" :no-overflow="true")

        HList()
          button(btn="~ accent-filled" w="full" text="$corporation-over-accent-color" @click="executeSwap") {{ $t(`corporations.astro-cap.swap-btn`) }}

      

</template>

<script lang="ts" setup>
import SwapArrows from '/assets/images/ui/corporations/swap-arrows.svg'
const { state, changeSwapDirection, executeSwap } = useCorporationSwap()

</script>


<style lang="postcss"></style>