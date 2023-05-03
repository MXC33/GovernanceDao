<template lang="pug">
#app(bg="mc-orange" font="foundry")
  HList()
    div hello {{ data }}

</template>

<script setup lang="ts">
const { data, execute } = useAsyncState('ix-api', async () => 'test')
await execute()
</script>