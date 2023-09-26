<template lang="pug">
VList()

  div(w="30 md:60" frame="~" space-y="4 md:8")
    slot(name="collectionImage")
      img(src="~/assets/images/collection/general.png" v-if="context == 'collection'")
      img(src="~/assets/images/collection/my-assets.png" v-else)

  div(pos="absolute right-0 top-0" m="t-0" v-if="!isClosed" w="50 md:auto" )
    a(href="https://territorylottery.planetix.com/")
      img(src="~/assets/images/collection/territory-win.png" )
    Close(pos="absolute right-4 top-6 md:top-10" w="2 md:3" cursor="pointer" @click="isClosed = true")


  HList(items="center" space-x="2" space-y="4 md:8")
    span(color="gray-50" font="bold" text="3xl")
      slot(name="header")

    slot(name="cert")

  HList(w="full" space-y="4 md:8")
    slot(name="attributes")

</template>

<script lang="ts" setup>
import type { CollectionContext } from '~/composables/useCollection';
import Close from '~/assets/icons/close.svg'


defineProps<{
  context: CollectionContext
}>()
const isClosed = ref(false)

</script>

<style></style>
