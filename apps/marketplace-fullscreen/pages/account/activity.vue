<template lang="pug">
Activity(:data="data" :context="'activity'" v-if="data" :hide-grid="true" :loading="pending")
AccountMenu()

</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";


const { data: data, execute: fetchActivity, refresh: refresh, pending } = useActivityAPI()

await refresh()

console.log("data", data.value?.list)



</script>
