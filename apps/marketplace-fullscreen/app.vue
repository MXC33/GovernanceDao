<template lang="pug">
#app(bg="mc-orange" font="foundry")
  HList()
    div(text="3xl" uppercase="~") My assets
    div test

</template>

<script setup lang="ts">
const { data, execute } = useAsyncState('ix-api', async () => 'test')
await execute()
</script>