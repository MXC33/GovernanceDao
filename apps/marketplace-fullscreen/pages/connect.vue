<template lang="pug">
Wallet.test()
</template>


<script lang="ts" setup>
useHead({
  title: "Connect | Marketplace | PlanetIX"
})

const { isLoggedInAndConnected } = useLogin()

const route = useRoute()

definePageMeta({
  middleware: ''
})

watch(isLoggedInAndConnected, (connected) => {
  if (!process.client || !connected)
    return

  const redirectQuery = route.query.redirectUrl

  if (redirectQuery) {
    const path = decodeURIComponent(String(redirectQuery))

    if (path.includes('connect'))
      return

    const ensureRelativeQuery = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gmi

    if (path.match(ensureRelativeQuery)) {
      return navigateTo(path)
    } else {
      return navigateTo('/')
    }
  } else {
    return navigateTo('/')
  }


})
</script>
