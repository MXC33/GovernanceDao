<template lang="pug">
VList(v-if="data")
  Activity(:data="noBurnData" :context="'activity'" v-if="data" :hide-grid="true" :loading="pending")
    template(#menu)
      AccountMenu()

  HList(w="lt-md:full" justify="center" py="2" v-if="!!data.page_key && Number(data.page_key) > 0")
    button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right s-sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") {{ $t(`marketplace.navigation.loadMore`)}}

</template>


<script lang="ts" setup>
import type { ActivityDataList } from '~/composables/api/get/useActivityAPI';

const { data: data, execute: fetchActivity, refresh: refresh, pending, loadNextPage } = useActivityAPI()

await fetchActivity()

console.log("data", data.value)

const noBurnData = computed(() => {
  return {
    page_key: data.value?.page_key ? data.value?.page_key : '',
    list: data.value?.list ? data.value?.list.filter(item => item.event !== 'burn') : []
  }
})


</script>
