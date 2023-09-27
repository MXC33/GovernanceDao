<template lang="pug">
CorporationPage(@click-back="onClickBack")

  template(#title)
    TitleWithPointer {{ $t(`corporations.y-space.titles.service`) }}

  template(#default)
    CorporationActionSelect()

      CorporationButton(:page="page" v-for="page in pages")

  template(#buttonBack) {{ $t(`general.exit`) }}
</template>

<script lang="ts" setup>
const { gotoCorporationOverview } = useCorporations()

const onClickBack = () => {
  gotoCorporationOverview()
}

const pages = ['repair', 'rename']

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

</script>
