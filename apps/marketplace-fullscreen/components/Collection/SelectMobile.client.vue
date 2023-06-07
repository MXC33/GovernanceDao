<template lang="pug">
DropdownSelectMobile(:items="collections" v-if="collections")

  template(#item="{item}")
    NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
      HList(items="center" w="full" whitespace="nowrap")
        HList(w="8" h="8" mr="3")
          img(src="~/assets/testfiles/test-collection-bg.png" )

        HList(w="full" v-if="item.name != 'PlanetIX Assets'" align="left")
          span() {{ item.name }}
        HList(w="full" v-else align="left") 
          span() PlanetIX - Assets

      HList(justify="end" items="center" w="full")
        div(color="gray-200" font="normal") {{ item.nft_count }}

  </template>

<script lang="ts" setup>
import { useCollectionsData } from "~/composables/api/post/useCollectionAPI"

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()

</script>
