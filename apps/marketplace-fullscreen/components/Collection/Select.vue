<template lang="pug">
DropdownSelect(:items="collections" v-if="collections")
  template(#selectedName) Explore Collections

  template(#item="{item}")
    NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
      div(w="8" h="8" mr="3")
        img(src="~/assets/testfiles/test-collection-bg.png" )

      div(flex-grow="1" v-if="item.name != 'PlanetIX Assets'") {{ item.name }}
      div(flex-grow="1" v-else) PlanetIX - Assets
      div(color="gray-200" font="normal") 50 items

</template>

<script lang="ts" setup>
import { useCollectionsData } from "~/composables/api/post/useCollectionAPI";

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()

const nameOfCollection = computed(() => collections.value?.flatMap(item => item.name))



console.log(nameOfCollection)
</script>
