<template lang="pug"> 
VList(space-y="6")
  LandmarkUserListItem(:item="item" v-for="item in data")

</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { data } = defineProps<{
  data: StakingItemFragment[]
}>()

</script>