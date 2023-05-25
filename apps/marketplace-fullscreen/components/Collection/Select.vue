<template lang="pug">
DropdownSelect(:items="collections" v-if="collections")    
  template(#selectedName) Explore Collections

  template(#item="{item}")
    NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full")
      div(w="8" h="8" mr="3")
        img(src="~/assets/testfiles/test-collection-bg.png" )

      div(flex-grow="1") {{ item.name }}
      div(color="gray-200" font="normal") 50 items

</template>

<script lang="ts" setup>
const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()
</script>