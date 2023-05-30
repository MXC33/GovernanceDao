<template lang="pug">
HList(w="full" space-x="10")
  TabItem(v-for="tab in tabs" :id="tab" v-model="activeTab" @click="onClick(tab)") {{ $t(`marketplace.myAssets.${tab}`) }} 

</template>
    
<script lang="ts" setup>

const onClick = (tab: Tab) => {
  return navigateTo('/account/' + links(tab))
}
const { path } = useRoute()


type Tab = 'myItems' | 'favourites' | 'incomingBids' | 'outgoingBids' | 'activeListings' | 'activity'

const accountTabs: Tab[] = ['myItems', 'incomingBids', 'outgoingBids', 'activeListings']

const { tabs, activeTab } = useTabList(accountTabs)


const links = (tab: Tab) => {
  switch (tab) {
    case 'myItems':
      return ''
    case 'favourites':
      return 'favourites'
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


const routeToTab = computed(() => {
  switch (path) {
    case '/account/':
      return 'myItems'
    case '/account/bids/incoming':
      return 'incomingBids'
    case '/account/bids/outgoing':
      return 'outgoingBids'
    case '/account/favourites':
      return 'favourites'
    case '/account/active-listings':
      return 'activeListings'
    case '/account/activity':
      return 'activity'
  }
})

activeTab.value = routeToTab.value


</script>
    
