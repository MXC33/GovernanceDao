<template lang="pug">
div(flex="~ col" mt="8" w="1/2" space-y="3")
  div(v-for="(item, title) in sliced")
    UserStatisticsItem(:title="title" :value="item")
</template>

<script setup>
const { statisticsObj } = useUserData()

const statistics = statisticsObj.value
const sliced = Object.fromEntries(
    Object.entries(statistics).slice(0, 3)
)
</script>