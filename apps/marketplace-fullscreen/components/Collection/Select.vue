<template lang="pug">
OptionSelect(:items="collections" :is-banner="true")
  template(#header)
    CollectionIcon(w="6" translate-y="-0.4" display="md:none")
    span(ml="md:!0") {{ $t(`collection.explore`) }}

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
</script>
