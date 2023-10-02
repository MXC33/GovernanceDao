<template lang="pug">
div(flex="~ row" items="center" uppercase="~" min-w="0")
  div(w="1" h="1" mx="1" flex="shrink-0" :bg="userIsOnline ? 'mc-mint' : 'mc-orange'")

  div(:color="userIsOnline ? 'mc-mint' : 'mc-orange'" :text-shadow="userIsOnline ? 'mc-mint' : 'mc-orange'" max-w="full") 
    p(truncate="~") {{ loginStatus == 'logged-in' ? 'online' : 'offline'}}
</template>

<script setup lang="ts">
const { loginStatus } = useLogin()
const { user } = useUser()

const userIsOnline = computed(() => user.value != null)
</script>