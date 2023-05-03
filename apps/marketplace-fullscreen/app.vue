<template lang="pug">
div(bg="mc-orange")
  HList()
    div hello {{ data }}

</template>

<script setup lang="ts">
const { data, execute } = useAsyncState('ix-api', async () => 'test')
await execute()
</script>