<template lang="pug">
VList(flex-grow="1" px="6" pos="relative")
  .gradient-bg(pos="fixed left-0 right-0 top-16" h="50vh" :style="gradientStyle" v-if="!onSingleItem")

transition(name="fade-slow")
  HList(py="4" justify="between" items="center" pos="sticky top-16" z="3" bg="on-locked:ix-black" px="8" transition="all" :locked="isScrolling")
    NetEmpireLogo(w="45")

    HList(space-x="4" w="full" justify="end" items="center")
      CollectionSelect()

      ButtonSquareIcon()
        UserIcon(w="6")

      ButtonSquareIcon(@click="viewingCart = true")
        CartIcon(w="6")

</template>

<script lang="ts" setup>
import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'

const { viewingCart } = useCart()
const y = useGlobalWindowScroll()

const route = useRoute()


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
