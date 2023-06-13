<template lang="pug">
OptionSelect(:items="collections")
  template(#header) 
    | {{ $t(`collection.explore`) }}

  template(#icon)
    CollectionIcon()

  template(#item="{item}")
    OptionRowCollection(:item="item")     

</template>

<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/explore-collection.svg'
import { useCollectionsData } from "~/composables/api/post/useCollectionAPI"

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()
console.log("DATA", collections.value?.length)
</script>
