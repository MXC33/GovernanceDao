<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer
      template(#default) {{ $t(`corporations.${corporationRouteI18n}.header`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="shop")
      //- CorporationButton(page="stake-burn")

  template(#buttonBack) {{ $t(`general.exit`) }}
</template>

<script lang="ts" setup>
const { corporationRouteI18n } = useCorporationRoute()

const onExit = () => {
  navigateTo('/mission-control')
}
</script>
