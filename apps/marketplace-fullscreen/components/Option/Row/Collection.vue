<template lang="pug">
OptionRow()
  NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
    div(w="8" h="8" mr="3")
      img(src="~/assets/testfiles/test-collection-bg.png" )

    div(flex-grow="1" v-if="item.name != 'PlanetIX Assets'") {{ item.name }}
    div(flex-grow="1" v-else) PlanetIX - Assets
    div(color="gray-200" font="normal") {{ item.nft_count }}

</template>

<script setup lang="ts">
import type { Collection } from '~/composables/useCollection';

defineProps<{
  item: Collection
}>()
</script>