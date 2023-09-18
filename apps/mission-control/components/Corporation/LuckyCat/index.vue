<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer
      template(#default) {{ $t(`corporations.lucky-cat.overview.header`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="shop")
      CorporationButton(page="raffle")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>

const { activeRaffleItem } = useCorporationRaffle()
activeRaffleItem.value = null

const onExit = () => {
  navigateTo('/mission-control')
}

</script>
