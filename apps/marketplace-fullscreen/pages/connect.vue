<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center")
  WalletConnector()
</template>


<script lang="ts" setup>
const { isLoggedInAndConnected } = useLogin()
const redirect = useLoginRedirect()
const isDirty = ref(false)


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

  if (origin == 'static')
    return

  if (redirect.value) {
    return navigateTo(redirect.value)
  } else if (isDirty.value) {
    return navigateTo('/')
  }

  isDirty.value = true
}, { immediate: true })
</script>