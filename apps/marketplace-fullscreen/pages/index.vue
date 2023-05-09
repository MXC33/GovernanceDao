<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative")
  div(grid="~ cols-4")
    ListItem(:token="token" v-for="token in allTokens")

</template>


<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()
</script>