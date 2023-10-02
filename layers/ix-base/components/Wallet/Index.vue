<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center" font="gridnik")
  WalletConnector()
  
</template>

<script lang="ts" setup>

const props = defineProps<{
  successPath?: string,
  title?: string
}>()

useHead({
  title: "Connect | PlanetIX"
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
  const successPath = props.successPath ?? "/"

  if (redirectQuery) {
    const redirectPath = decodeURIComponent(String(redirectQuery))
    const ensureRelativeQuery = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gmi
    if (redirectPath.match(ensureRelativeQuery))
      return navigateTo(redirectPath)
    else
      return navigateTo(successPath)
  } else {
    return navigateTo(successPath)
  }
})
</script>
  