<template lang="pug">
CorporationPage(@click-back="goBack()")
  template(#title)
    TitleWithPointer {{ $t(`corporations.${corporationRouteI18n}.header`) }}

  template(#default)
    CorporationActionSelect()

      CorporationButton(page="craft" :corporation-order-id="{type: 'eternalab', task: 'craft'}" icon="biomod-refine")

      CorporationButton(page="fusion" :corporation-order-id="{type: 'eternalab', task: 'fusion'}" icon="biomod-fusion")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
const { goBack } = useCorporationRoute()
const { corporationRouteI18n } = useCorporationRoute()
const { execute: fetchTokens } = useTokenData()

await Promise.all([
  fetchTokens()
])

definePageMeta({
  layout: 'corporation'
})


</script>
