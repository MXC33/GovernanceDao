<template lang="pug">
div(grid="~ cols-2 gap-3")
  template(v-for="pool in ixtPoolData")
    HomepageStakingIxtItem( :pool="pool.data" :month="pool.month" v-if="pool.data")

</template>


<script lang="ts" setup>
const { ixtPoolData } = useStakingPools()
console.log("IXT", ixtPoolData.value)
</script>