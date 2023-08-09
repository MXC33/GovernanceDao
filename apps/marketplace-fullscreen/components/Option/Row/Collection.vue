<template lang="pug">
OptionRow()
  NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
    span(w="8" h="8" mr="3")
      img(src="~/assets/images/collection/general.png")

    span(flex-grow="1" font="lt-md:bold") {{ useCollectionName(item.contract) }}
    span(v-if="item.contract == planetIXAssets" color="gray-200" font="normal") {{ item.nft_count - 4 }}
    span(v-else color="gray-200" font="normal") {{ item.nft_count }}

</template>

<script setup lang="ts">
import type { Collection } from '~/composables/useCollection'

const { item } = defineProps<{
  item: Collection
}>()

const planetIXAssets = '0xba6666b118f8303f990f3519df07e160227cce87'
</script>