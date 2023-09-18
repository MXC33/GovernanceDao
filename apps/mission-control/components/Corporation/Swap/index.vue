<template lang="pug">
CorporationPage(@click-back="onClickBack" :can-proceed="true")
  template(#title) {{$t(`corporations.astro-cap.swap.header`)}}

  template(#default)
    CorporationSwapExchange(v-if="!isComplete")
    CorporationComplete(v-else action="craft")
      template(#afterText v-if="latestSwap")
        CorporationSwapTransComplete(:item="latestSwap")

  template(#buttonBack v-if="!isComplete") {{ $t(`general.back`) }}

</template>

<script lang="ts" setup>
const { isComplete, latestSwap } = useCorporationSwap()

const { gotoCorporationOverview } = useCorporations()
const { goBack } = useCorporationRoute()

const onClickBack = () => {
  if (!!isComplete.value)
    gotoCorporationOverview()
  else
    goBack()
}
</script>
