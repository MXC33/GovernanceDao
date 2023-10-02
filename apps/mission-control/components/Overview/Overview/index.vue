<template lang="pug">
VList(flex-grow="1" min-h="0" space-y="4")
  OverviewToolMenu(:tabs="tabs", v-model="activeTab")
  OverviewList()

</template>

<script setup lang="ts">
const { tabs, activeTab } = useOverview()

</script>