<template lang="pug">
VList(text="sm")
  div
    span(v-if="!item.ixtPrice" color="semantic-warning") Price not set
    span(v-else font="bold") {{ item.ixtPrice }} IXT 

  div 
    span(v-if="!item.durationInDays" color="semantic-warning") Time not set
    span(v-else font="bold") {{ item.durationInDays }} Days 
</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
defineProps<{ item: ListingItem }>()
</script>
  