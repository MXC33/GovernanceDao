<template lang="pug">
VList.graidentCollection(flex-grow="1" space-y="12" px="8")
  HList(py="4" justify="between" items="center")
    div(w="45")
      NetEmpireLogo()

    slot(name="functions")
      HList(space-x="4" w="full" justify="end" items="center")
        HList(w="25%" color="white" frame="~ white" font="bold" justify="between" items="center" h="10" px="3")
          span() Explore Collections
          ChevronIcon(w="5" translate-y="-0.3" fill="white")

        ButtonSquareIcon()
          UserIcon(w="6")

        ButtonSquareIcon()
          CartIcon(w="6")



  VList(space-y="8")

    img(src="~/assets/testfiles/test-collection-bg.png" w="60")

    HList(items="center" space-x="2")
      span(color="gray-50" font="bold" text="3xl")
        slot(name="header")
      CertifiedIcon(w="6")
    HList(w="full")
      slot(name="attributes")
</template>

<script lang="ts" setup>
import NetEmpireLogo from '~/assets/icons/logo/netempire.svg'
import CertifiedIcon from '~/assets/icons/certified.svg'
import UserIcon from '~/assets/icons/user.svg'
import CartIcon from '~/assets/icons/cart.svg'
import ChevronIcon from '~/assets/icons/chevron-down.svg'

</script>

<style>
.graidentCollection {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 50%, rgba(203, 0, 16, 1) 100%);
}
</style>