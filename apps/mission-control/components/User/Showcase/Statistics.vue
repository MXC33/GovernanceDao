<template lang="pug">
div(flex="~ row wrap" mx="2")
  div(v-for="(item, title) in statistics" grid="~ cols-2" m="b-4")
    UserShowcaseStatisticsItem(:title="title" :value="item")
</template>

<script setup>
const { statisticsObj } = useUserData()

const statistics = statisticsObj.value
</script>
