<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="6" space-y="6")
  h1(text="3xl" font="bold") MY ASSETS

  HList(space-x="3")
    VList(w="150")
      h3(font="bold" uppercase="~") Collection

    div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5")
      ListItem(:token="token" v-for="token in allTokens" b="gray-400")

</template>


<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()
</script>