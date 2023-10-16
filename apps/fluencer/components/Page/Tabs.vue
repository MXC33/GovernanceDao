<template lang="pug">
TabList()
  TabItem(v-for="tab in tabs" :is-active="tab == activeTab" @click="navigateTo(getURL(tab))" :key="tab" :notifications="notificationCount(tab)") {{ $t('fluencer.tab.' + tab) }}

</template>

<script lang="ts" setup>

const tabs = ["open", "stake-metashares", "stake-ixt", "history"] as const
type Tab = typeof tabs[number]

const route = useRoute()

const getURL = (tab: Tab) => {
  switch (tab) {
    case "open":
      return "/"

    default:
      return `/${tab}`
  }
}

const notificationCount = (tab: Tab) => {
  switch (tab) {
    case "open":
      return 4

    default:
      return 0
  }
}

const activeTab = computed(() => {
  if (route.name == 'index')
    return 'open'
  return route.name
})

</script>
