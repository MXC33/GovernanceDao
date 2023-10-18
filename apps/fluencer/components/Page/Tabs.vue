<template lang="pug">
TabList()
  TabItem(v-for="tab in tabs" :is-active="tab == activeTab" @click="navigateTo(getURL(tab))" :key="tab" :notifications="notificationCount(tab)") {{ $t('fluencer.tab.' + tab) }}

</template>

<script lang="ts" setup>

const tabs = ["open", "stake-metashares", "stake-ixt"] as const
type Tab = typeof tabs[number]

const route = useRoute()
const { ixtBalance } = useCurrencyData()
const { data: vouchers } = useVoucherData()
const { data: tokens } = useTokenData()
const metashares = computed(() => {
  if (!tokens.value)
    return []
  return tokens.value.filter(item => filterMetashareType(item))
})
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
      return vouchers.value?.map((token) => token.balance).reduce((prev, current) => (prev ?? 0) + (current ?? 0) ?? 0, 0)

    case "stake-metashares":
      return metashares.value?.length ?? 0

    case "stake-ixt":
      return ixtBalance.value > 0 ? 1 : 0

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
