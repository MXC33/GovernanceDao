<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer
      template(#default) {{ $t(`corporations.new-lands.overview.header`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="construction" icon="craft")
      CorporationButton(page="shop")
      CorporationButton(page="stake-burn")

  template(#buttonBack) {{ $t(`general.exit`) }}
</template>

<script lang="ts" setup>
const onExit = () => {
  navigateTo('/mission-control')
}
</script>
