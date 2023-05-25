<template lang="pug">
HList(w="full" space-x="10")
  template(v-for="item in menuItems" )
    div() {{ item }}
  
</template>
    
<script lang="ts" setup>

const menuItems = ['My Items', 'Favourites', 'Incoming Bids', 'Outgoing Bids', 'Active Listings', 'Activity']


</script>
    
