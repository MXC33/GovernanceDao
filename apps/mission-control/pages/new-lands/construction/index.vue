<template lang="pug">
CorporationPage(@click-back="goBack()")
  template(#default)
    CorporationActionSelect()

      CorporationButton(page="build"  icon="craft" :corporation-order-id="{type: 'new-lands', task: 'craft'}")
      CorporationButton(page="upgrade"  icon="craft" :corporation-order-id="{type: 'new-lands', task: 'upgrade'}")


  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
const { goBack } = useCorporationRoute()

definePageMeta({
  layout: 'corporation'
})


</script>
