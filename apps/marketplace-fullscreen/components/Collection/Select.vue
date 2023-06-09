<template lang="pug">
VList()
  ButtonSquareIcon(display="md:none")
    CollectionIcon(w="6" @click="toggleCollection")

  VList(display="lt-md:none")
    DropdownSelect(:items="collections" v-if="collections")
      template(#selectedName) Explore Collections

      template(#item="{item}")
        OptionRowCollection(:item="item")

Teleport(to="#takeover")
  Transition(name="slide-bottom")
    OptionPanel(v-if="showCollection" @close="showCollection = false")
      template(#header) Explore Collections
      template(#default)
        OptionRowCollection(:item="item" v-for="item in collections")

</template>

<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/explore-collection.svg'
import { useCollectionsData } from "~/composables/api/post/useCollectionAPI"

const showCollection = ref(false)

const toggleCollection = () => {
  showCollection.value = !showCollection.value
}

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()

</script>
