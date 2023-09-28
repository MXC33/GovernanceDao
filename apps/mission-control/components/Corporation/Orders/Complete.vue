<template lang="pug">
div(flex-center="md:col" flex="grow")

  section(flex="~ row" b="1 $mc-accent" max-w="150")
    div(w="80")
      CorporationAvatar(:corporation="id" b="1 $mc-accent")
    div
      p.complete-line(v-html="$t(`corporations.${id}.complete`)" p="x-6 y-4")

      CorporationSwapComplete(v-if="id == 'astro-cap'")

HList(v-if="id == 'astro-cap'" flex="~ col md:row" justify="end" items="end" px="4" py="4" gap="2 md:8" )
  button(btn="~ accent-outline" py="4.2" cut="bottom-right b-$mc-accent" text="$mc-accent" w="full md:auto" @click="goBack") {{ $t(`corporations.astro-cap.backTo`) }}
  button(btn="~ accent-filled" cut="bottom-right b-$mc-accent" text="$corporation-over-accent-color" w="full md:auto" @click="goMc") {{ $t(`general.mission-control`) }}

</template>

<script lang="ts" setup>
const id = useActiveCorporation()

const { gotoCorporationOverview } = useCorporations()

const goBack = () => {
  gotoCorporationOverview()
}

const goMc = () => {
  navigateTo('/mission-control')
}

</script>

<style>
.complete-line strong {
  color: var(--mc-accent)
}
</style>