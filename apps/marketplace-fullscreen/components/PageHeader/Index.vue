<template lang="pug">
VList(flex-grow="1" px="6" pos="relative")
  .gradient-bg(pos="fixed left-0 right-0 top-16" h="50vh" :style="gradientStyle")

transition(name="fade-slow")
  HList(py="4" justify="between" items="center" pos="sticky top-16" z="2" :bg="bgBarOnScroll" px="8" transition="all")
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

        ButtonSquareIcon(@click="viewingCart = true")
          CartIcon(w="6")
div()
  div(frame="~ gray-300" )
    div(font="foundry bold" color="white" text="base" h="10" px="3" flex="~" justify="between" items="center"  bg="gray-800 hover:gray-700" cursor="pointer" @click="dropDownShown = !dropDownShown" )
      div() {{ collection }} asd
      ChevronIcon(w="4" fill="white" v-if="!dropDownShown")
      ChevronIconUp(w="4" fill="white" v-else)
  div(frame="~ gray-300" text="base" mt="2" v-if="dropDownShown" )
    NuxtLink(:to="'/assets/polygon/'+item.slug" font="foundry bold" color="white" h="12" px="3" flex="~" justify="between" items="center" b="b-1 gray-600" bg="gray-800 hover:gray-700" v-for="item of collections")
      div( flex="~" items="center")
        div(w="8" h="8" mr="3")
          img(src="~/assets/testfiles/test-collection-bg.png" )
        div() {{ item.name }}
      div( color="gray-200" font="normal") 50 items

</template>

<script lang="ts" setup>
import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'
import ChevronIcon from '~/assets/icons/chevron-down.svg'
import ChevronIconUp from '~/assets/icons/chevron-up.svg'
import type {CollectionData} from '~/composables/useCollection';
import {ref} from "vue";

const { viewingCart } = useCart()
const { y } = useWindowScroll()

const route = useRoute()
let { collection } = route.params
watch(route, (val) => {
  nextTick(() =>{
    collection = val.params.collection
  })
})

console.log('collection', collection)

const gradientStyle = computed(() => ({
  opacity: 100 - (y.value / 500) * 100 + '%'
}))

const bgBarOnScroll = computed(() => {
  if (y.value >= 10)
    return 'ix-black'
  return null
})
const dropDownShown = ref(false);

const { data: collectionsList, execute: fetchAllCollections } = useCollectionsData()

onMounted(async () => {
  await fetchAllCollections()
})

const collections = computed<CollectionData>(() => (collectionsList.value as CollectionData))

</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(203, 0, 16, 0.5) 100%);
}
</style>
