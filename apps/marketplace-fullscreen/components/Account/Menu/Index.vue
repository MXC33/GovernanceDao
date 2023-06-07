<template lang="pug">
VList(b="b-1 gray-400")
  HList(w="full" space-x="8 md:12" mb="-2px" overflow-x="scroll" whitespace="nowrap")
    AccountMenuTab(v-for="tab in accountTabs" :key="tab" :is-active="tab === activeTab" @click="onClick(tab)") {{ $t(`marketplace.myAssets.${tab}`) }}

</template>
    
<script lang="ts" setup>
const { path } = useRoute()

type Tab = 'myItems' | 'incomingBids' | 'outgoingBids' | 'activeListings' | 'activity'
const accountTabs: Tab[] = ['myItems', 'incomingBids', 'outgoingBids', 'activeListings', 'activity']

const links = (tab: Tab) => {
  switch (tab) {
    case 'myItems':
      return ''
    case 'incomingBids':
      return 'bids/incoming'
    case 'outgoingBids':
      return 'bids/outgoing'
    case 'activeListings':
      return 'active-listings'
    case 'activity':
      return 'activity'
  }
}

const onClick = (tab: Tab) => {
  return navigateTo('/account/' + links(tab))
}

const activeTab = computed(() => {
  const currentPath = path.replace('/account/', '');
  const foundTab = accountTabs.find(tab => links(tab) === currentPath);
  return foundTab ? foundTab : 'myItems';
});

</script>
    
