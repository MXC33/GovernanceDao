<template lang="pug">
CorporationPage(@click-back="goBack()")
  template(#title)
    TitleWithPointer {{ $t(`corporations.y-space.titles.stake`) }}

  template(#default)
    CorporationActionSelect()

      CorporationButton(:page="page" v-for="page in pages")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
const pages = ['stake-genesis', 'burn']


const { goBack } = useCorporationRoute()

definePageMeta({
  layout: 'corporation'
})
</script>