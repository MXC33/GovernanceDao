<template lang="pug">
CorporationPage(@click-back="onClickBack")

  template(#title)
    TitleWithPointer {{ $t(`corporations.gws.titles.waste-management`) }}

  template(#default)
    CorporationActionSelect()
      CorporationButton(page="sell-waste" icon="sell-waste" :corporation-order-id="{type: 'gws', task: 'craft'}")
      //- CorporationButton(page="construct-machinery" icon="craft")

  template(#buttonBack) {{ $t(`general.exit`) }}
</template>

<script lang="ts" setup>
const { gotoCorporationOverview } = useCorporations()

const onClickBack = () => {
  gotoCorporationOverview()
}

definePageMeta({
  layout: 'corporation'
})

</script>
