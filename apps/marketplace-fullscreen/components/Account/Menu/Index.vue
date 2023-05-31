<template lang="pug">
VList(pos="relative")
  HList(w="full" space-x="12" pos="relative")
    AccountMenuTab(v-for="tab in accountTabs" :key="tab" :is-active="tab === activeTab" @click="onClick(tab)") {{ $t(`marketplace.myAssets.${tab}`) }}

  HList(pos="absolute top-full left-0" translate-y="-100%" z="1" w="full")
    HList(w="full" b="b-1 gray-400" v-if="!isScrolling")
</template>
    
<script lang="ts" setup>
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 590
})

const { path } = useRoute()

type Tab = 'myItems' | 'incomingBids' | 'outgoingBids' | 'activeListings'
const accountTabs: Tab[] = ['myItems', 'incomingBids', 'outgoingBids', 'activeListings']

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
    
