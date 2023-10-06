<template lang="pug">
VList()

  div(w="30 md:60" frame="~" space-y="4 md:8")
    slot(name="collectionImage")
      img(src="~/assets/images/collection/general.png" v-if="context == 'collection'")
      img(src="~/assets/images/collection/my-assets.png" v-else)

  SplashBox(v-if="boxAdActive")


  HList(items="center" space-x="2" space-y="4 md:8")
    span(color="gray-50" font="bold" text="3xl")
      slot(name="header")

    slot(name="cert")

  HList(w="full" space-y="4 md:8")
    slot(name="attributes")

</template>

<script lang="ts" setup>
import type { CollectionContext } from 'composables/useCollection';

const { boxAdActive } = useAds()

defineProps<{
  context: CollectionContext
}>()

</script>

<style></style>
