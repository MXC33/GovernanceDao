<template lang="pug">
VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center")
  WalletConnector()
</template>


<script lang="ts" setup>
import type { RouteRecordName } from 'vue-router';

const { isLoggedInAndConnected } = useLogin()
const router = useRouter()
const route = useRoute()

const { origin } = route.query

const isDirty = ref(false)

watch(isLoggedInAndConnected, (connected) => {
  if (!process.client)
    return

  if (!connected) {
    isDirty.value = true
    return
  }

  if (origin == 'static')
    return

  if (origin) {
    return router.push({ name: origin as RouteRecordName })
  } else if (isDirty.value) {
    return router.push('/')
  }

  isDirty.value = true
}, { immediate: true })
</script>