<template lang="pug">
CorporationPage(@click-back="goBack()")
  template(#title)
    TitleWithPointer {{ $t(`corporations.gravity-grade.titles.stake`) }}

  template(#default)
    CorporationActionSelect()

      CorporationButton(:page="'stake-genesis'")
      CorporationButton(:page="'burn'")


  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>

const { goBack } = useCorporationRoute()

definePageMeta({
  middleware: 'gravity-grade',
  layout: 'corporation'
})
</script>