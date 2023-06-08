<template lang="pug">
Transition(name="fade-slow")
  VList(w="full" h="100vh" bg="gray-900" z="99" pos="sticky top-16 left-0" v-if="isOpen")
    HList(justify="between" items="center" b="b-0.5 gray-600" px="4" py="3")
      HList(items="center" space-x="2")
        CollectionIcon(w="6")
        span(color="white" font="bold" text="lg" translate-y="0.5" uppercase="~") explore collections

      HList(items="center" translate-y="0.2")
        CloseIcon(w="4" cursor="pointer" @click="$emit('close')")

    VList(px="3" w="full" space-y="2" gap="2" pt="4")
      template(v-for="item in collections")
        NuxtLink(:to="'/assets/polygon/' + item.contract" flex="~ row" items="center" w="full" @click="$emit('close')")
          div(w="10" h="10" mr="3")
            img(src="~/assets/testfiles/test-collection-bg.png" )

          div(v-if="item.name != 'PlanetIX Assets'" flex-grow="1" font="bold") {{ item.name }}
          div(v-else flex-grow="1" font="bold") PlanetIX - Assets
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