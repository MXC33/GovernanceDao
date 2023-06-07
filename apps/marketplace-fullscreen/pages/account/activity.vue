<template lang="pug">
Activity(:data="data" :context="'activity'" v-if="data" :hide-grid="true" :loading="pending")
  template(#menu)
    AccountMenu()

</template>


<script lang="ts" setup>

const { data: data, execute: fetchActivity, refresh: refresh, pending } = useActivityAPI()

await refresh()

console.log("data", data.value?.list.map(item => item.nft))



</script>
