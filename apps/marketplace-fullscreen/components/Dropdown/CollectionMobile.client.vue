<template lang="pug">
VList(w="full" h="100vh" bg="gray-900" z="99" pos="sticky top-16 left-0" v-if="isOpen" overflow-x="hidden")
  HList(justify="between" items="center" px="4" py="3")
    HList(items="center" space-x="2")
      CollectionIcon(w="6")
      span(color="white" font="bold" text="lg" translate-y="0.5" uppercase="~") explore collections

    HList(items="center" translate-y="0.2" px="2")
      CloseIcon(w="4" cursor="pointer" @click="$emit('close')")

  VList(w="full")
    template(v-for="item in collections")
      HList(bg="hover:gray-700" justify="between" b="b-0.5 gray-600 first:t-0.5" px="3" py="1")
        NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" flex-grow="1" items="center" @click="$emit('close')")
          HList(w="10" h="10" flex-shrink="0")
            img(src="~/assets/testfiles/test-collection-bg.png")

          HList(px="3" whitespace="nowrap" items="center" w="full" justify="between" translate-y="0.4" font="bold")
            div(v-if="item.name != 'PlanetIX Assets'") {{ item.name }}
            div(v-else) PlanetIX - Assets
          HList(items="center" flex-grow="1" translate-y="0.4" px="4")
            div(color="gray-200" font="normal") {{ item.nft_count }}

</template>

<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/explore-collection.svg'
import CloseIcon from '~/assets/icons/close.svg'

const { data: collections, execute: fetchAllCollections } = useCollectionsData()

await fetchAllCollections()

defineEmits(["close"])

const isOpen = defineModel()

</script>