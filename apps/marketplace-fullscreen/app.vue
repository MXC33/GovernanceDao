<template lang="pug">
div
  VList()
    div hello {{ data }}

</template>

<script setup lang="ts">
const { data, execute } = useAsyncState('ix-api', async () => 'test')
await execute()
</script>