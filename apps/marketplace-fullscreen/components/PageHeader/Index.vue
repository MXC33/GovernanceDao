<template lang="pug">
VList(flex-grow="1" px="0 md:6" pos="relative")
  .gradient-bg(pos="fixed left-0 right-0 top-16" h="50vh" :style="gradientStyle" v-if="!onSingleItem")

transition(name="fade-slow")
  div(flex="~ col md:row" pt="lt-md:4" py="md:4" justify="between" items="center" pos="sticky top-16" z="10" bg="on-locked:ix-black" px="4 md:8" transition="all" :locked="isScrolling")
    VList(w="full")
      HList(w="full" items="center")
        NuxtLink(:to="'/'" w="full")
          NetBetaLogo(w="45" translate-y="lt-md:-1.5")

        HList(display="md:none" gap="2" justify="between" pb="3")
          CollectionSelectMobile()

          ButtonSquareIcon(@click="onClickAccount")
            UserIcon(w="6")

          ButtonSquareIcon(@click="viewingCart = true")
            CartIcon(w="6")
            CartCounter

    //- HList(py="4" w="full" display="md:none")
    //-   CollectionSelect()


    HList(space-x="4" w="full" justify="end" items="center" display="lt-md:none")

      CollectionSelect(display="lt-md:none")

      ButtonSquareIcon(@click="onClickAccount")
        UserIcon(w="6")

      ButtonSquareIcon(@click="viewingCart = true")
        CartIcon(w="6")
        CartCounter


</template>

<script lang="ts" setup>
// import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
import NetBetaLogo from '~/assets/icons/logo/netbeta.svg'

import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'

const { viewingCart } = useCart()
const y = useGlobalWindowScroll()

const route = useRoute()

const onClickAccount = () => {
  navigateTo('/account')
}

const openDropdown = ref(false)

const collectionOpen = () => {
  openDropdown.value = !openDropdown.value
}


const onSingleItem = computed(() =>
  route.matched.some((match) => match.path.includes("tokenId") || match.path.includes("connect"))
)

const gradientStyle = computed(() => ({
  opacity: 100 - (y.value / 500) * 100 + '%'
}))

const isScrolling = computed(() => {
  return y.value >= 10
})

</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(203, 0, 16, 0.5) 100%);
}
</style>
