<template lang="pug">
VList(space-y="4 md:8")

  div(w="30 md:60" frame="~")
    slot(name="collectionImage")
      img(src="~/assets/images/collection/general.png" v-if="context == 'collection'")
      img(src="~/assets/images/collection/my-assets.png" v-else)

  HList(items="center" space-x="2")
    span(color="gray-50" font="bold" text="3xl")
      slot(name="header")

    slot(name="cert")

  HList(w="full")
    slot(name="attributes")

</template>

<script lang="ts" setup>
import type { CollectionContext } from '~/composables/useCollection';

defineProps<{
  context: CollectionContext
}>()
</script>

<style></style>