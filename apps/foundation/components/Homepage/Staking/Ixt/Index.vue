<template lang="pug">
div(grid="~ md:cols-2 gap-6")
  template(v-for="pool in ixtPoolData")
    HomepageStakingIxtItem( :pool="pool.data" :month="pool.month" v-if="pool.data")

</template>


<script lang="ts" setup>
const { ixtPoolData } = useStakingPools()
</script>