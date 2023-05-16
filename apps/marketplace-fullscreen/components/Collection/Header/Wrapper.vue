<template lang="pug">
VList.graidentCollection(flex-grow="1" space-y="12" px="8")
  HList(py="4" justify="between" items="center")
    div(w="45")
      NETEMPIRE
    slot(name="functions")
      HList(space-x="4" w="full" justify="end" items="center")
        HList(w="25%" color="white" frame="~ white" font="bold" justify="between" items="center" h="10" px="3")
          span() Explore Collections
          CHEVROND(w="5" translate-y="-0.3" fill="white")
        ButtonSquareIcon
          USER(w="6")
        ButtonSquareIcon
          CART(w="6")



  VList(space-y="8")

    img(src="~/assets/testfiles/test-collection-bg.png" w="60")

    HList(items="center" space-x="2")
      span(color="gray-50" font="bold" text="3xl")
        slot(name="header")
      CERTIFIED(w="6")
    HList(w="full")
      slot(name="attributes")
</template>

<script lang="ts" setup>
import NETEMPIRE from '~/assets/icons/logo/netempire.svg'
import CERTIFIED from '~/assets/icons/certified.svg'
import USER from '~/assets/icons/user.svg'
import CART from '~/assets/icons/cart.svg'
import CHEVROND from '~/assets/icons/chevron-down.svg'

</script>

<style>
.graidentCollection {
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 50%, rgba(203,0,16,1) 100%);
}
</style>