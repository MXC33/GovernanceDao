<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center")
  WalletConnector()

</template>


<script lang="ts" setup>

useHead({
  title: "Connect | Territory Lottery | PlanetIX"
})

const { isLoggedInAndConnected } = useLogin()

const route = useRoute()

definePageMeta({
  middleware: ''
})

watch(isLoggedInAndConnected, (connected) => {
  if (!process.client || !connected)
    return

  const redirectQuery = route.query.origin


  if (redirectQuery) {
    const path = decodeURIComponent(String(redirectQuery))
    const ensureRelativeQuery = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gmi
    if (path.match(ensureRelativeQuery))
      return navigateTo(path)
    else
      return navigateTo('/')
  } else {
    return navigateTo('/')
  }


})
</script>
