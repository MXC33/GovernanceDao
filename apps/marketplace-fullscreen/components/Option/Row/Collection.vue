<template lang="pug">
OptionRow()
  NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
    span(w="8" h="8" mr="3")
      img(src="~/assets/testfiles/test-collection-bg.png" )

    span(flex-grow="1" font="lt-md:bold") {{ useCollectionName(item.contract) }}
    span(color="gray-200" font="normal") {{ item.nft_count }}

</template>

<script setup lang="ts">
import type { Collection } from '~/composables/useCollection';
defineProps<{
  item: Collection
}>()
</script>