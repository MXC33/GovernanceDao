<template lang="pug">
CorporationBorderBox(:title="$t(`corporations.astro-cap.my-account`)" flex="~ col grow" min-h="md:0" overflow-y="auto" scrollbar="~ md:mc" cut="top-right s-lg b-$mc-accent")
  VList(space-y="4")
    VList(space-y="2")
      InfoHeader(bg="white opacity-20" font="bold") {{ $t(`corporations.astro-cap.account.balance`) }}

      CorporationSwapAccountBalanceItem(:token="token" v-for="token in tokens")

</template>
    
<script lang="ts" setup>
import type { NftFragment } from '#gql'


const { data } = useCurrencyData()

const tokens: NftFragment[] = data.value


</script>