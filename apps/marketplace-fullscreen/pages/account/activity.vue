<template lang="pug">
VList(v-if="data")
  Activity(:data="data" :context="'activity'" v-if="data" :hide-grid="true" :loading="pending")
    template(#menu)
      AccountMenu()

  HList(w="lt-md:full" justify="center" py="2" v-if="!!data.page_key && Number(data.page_key) > 0")
    button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") Load More

</template>


<script lang="ts" setup>

const { data: data, execute: fetchActivity, refresh: refresh, pending, loadNextPage } = useActivityAPI()

await fetchActivity()

console.log("data", data.value)



</script>
