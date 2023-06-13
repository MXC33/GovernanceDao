<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center")
  WalletConnector()
</template>


<script lang="ts" setup>

useHead({
  title: "Connect | Marketplace | PlanetIX"
})

const { isLoggedInAndConnected } = useLogin()
const redirect = useLoginRedirect()
const isDirty = ref(false)

const route = useRoute()

definePageMeta({
  middleware: ''
})

watch(isLoggedInAndConnected, (connected) => {
  if (!process.client)
    return

  if (!connected) {
    isDirty.value = true
    return
  }

  const redirectQuery = route.query.redirectUrl


  if (redirectQuery) {
    const path = decodeURIComponent(String(redirectQuery))
    const ensureRelativeQuery = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gmi

    if (path.match(ensureRelativeQuery))
      return navigateTo(path)
  }

  if (isDirty.value)
    return navigateTo('/')

  isDirty.value = true

}, { immediate: true })
</script>
