<template lang="pug">
#app.antialiased(font="foundry" bg="ix-black" text="sm lg:md" ref="app" pos="absolute" inset="0" min-h="0" overscroll="none" overflow="hidden" flex="~ col grow")
  NuxtLayout
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")

    NuxtPage()

</template>

<script setup lang="ts">
const { data, execute } = useAsyncState('ix-api', async () => 'test')
await execute()
</script>