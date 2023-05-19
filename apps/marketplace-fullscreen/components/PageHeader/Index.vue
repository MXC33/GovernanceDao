<template lang="pug">
VList(flex-grow="1" px="6" pos="relative")
  .gradient-bg(pos="fixed left-0 right-0 top-16" h="50vh" :style="gradientStyle")
transition(name="fade-slow")
  HList(py="4" justify="between" items="center" pos="sticky top-16" z="2" :bg="bgBarOnScroll" px="6" transition="all")
    NetEmpireLogo(w="45")

    slot(name="functions")
      HList(space-x="4" w="full" justify="end" items="center")
        HList(w="25%" color="white" frame="~ white" font="bold" justify="between" items="center" h="10" px="3")
          span() Explore Collections
          ChevronIcon(w="5" translate-y="-0.3" fill="white")

        HList(w="25%" color="white" frame="~ white" font="bold" justify="between" items="center" h="10" px="3")
          NuxtLink(:to="'/assets/polygon/'+item.slug" v-for="item of collections" ) {{ item.name }}

        ButtonSquareIcon()
          UserIcon(w="6")

        ButtonSquareIcon()
          CartIcon(w="6")

</template>

<script lang="ts" setup>
import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'
import ChevronIcon from '~/assets/icons/chevron-down.svg'
import type {CollectionData} from '~/composables/useCollection';

const { y } = useWindowScroll()

const gradientStyle = computed(() => ({
  opacity: 100 - (y.value / 500) * 100 + '%'
}))

const bgBarOnScroll = computed(() => {
  if (y.value >= 10)
    return 'black'
  return null
})

const { data: collectionsList, execute: fetchAllCollections } = useCollectionsData()

onMounted(async () => {
    await fetchAllCollections()
})

const collections = computed<CollectionData>(() => (collectionsList.value as CollectionData))
console.log('collections', collections.value)

</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(203, 0, 16, 0.5) 100%);
}
</style>