<template lang="pug">
VList.graidentCollection(flex-grow="1" space-y="12")
  HList(px="6" py="4" justify="between" items="center")
    div(w="45")
      NETEMPIRE
    slot(name="functions")
      HList(space-x="4" w="full" justify="end" items="center")
        HList(w="25%" color="white" font="bold" items="center" h="10" px="2") Explore Collections
        div(w="10" h="10" color="white" b="1 white") •
        div(w="10" h="10" color="white" b="1 white") •


  VList(px="6" space-y="8")

    img(src="~/assets/testfiles/test-collection-bg.png" w="60")

    span(color="gray-50" font="bold" text="3xl")
      slot(name="header")
    HList(w="full")
      slot(name="attributes")
</template>

<script lang="ts" setup>
import NETEMPIRE from '~/assets/icons/logo/netempire.svg'
import IMGTEST from '~/assets/testfiles/test-collection-bg.png'

</script>

<style>
.graidentCollection {
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 50%, rgba(203,0,16,1) 100%);
}
</style>