<template lang="pug">
VList(flex-grow="1" px="0 md:6" pos="relative")
  .gradient-bg(pos="fixed left-0 right-0 top-12 md:top-16" h="50vh" :style="gradientStyle" v-if="!onSingleItem")

Transition(name="fade-slow")
  HList(w="full" items="center" justify="between" pos="sticky top-12 md:top-16" z="10" bg="on-locked:ix-black" space-x="3" p="x-4 y-4 md:(y-4 x-8)" translate-y="$header-offset" transition="all" :locked="isScrolling")
    NuxtLink(:to="'/'" w="full")
      NetEmpireLogo(w="35 md:45" )

    HList(space-x="3 md:4" w="full" justify="end" items="center")

      ButtonSquareIcon(@click="onClickGlobe")
        GlobeIcon(w="6")

      CollectionSelect()

      ButtonSquareIcon(@click="onClickAccount")
        UserIcon(w="6")

      ButtonSquareIcon(@click="viewingCart = true")
        CartIcon(w="6")
        CartCounter

</template>

<script lang="ts" setup>
import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
// import NetBetaLogo from '~/assets/icons/logo/netbeta.svg'
import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'
import GlobeIcon from '~/assets/icons/globe.svg'

const { viewingCart } = useCart()
const y = useGlobalWindowScroll()

const route = useRoute()

const onClickAccount = () => {
  navigateTo('/account')
}

const onClickGlobe = () => {
  navigateTo('https://planetix.com/netempire/pix', { external: true })
}

const onSingleItem = computed(() =>
  route.matched.some((match) => match.path.includes("tokenId") || match.path.includes("connect"))
)

const gradientStyle = computed(() => ({
  opacity: 100 - (y.value / 500) * 100 + '%'
}))

const isScrolling = computed(() => {
  return y.value >= 1
})

</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(203, 0, 16, 0.5) 100%);
}
</style>
