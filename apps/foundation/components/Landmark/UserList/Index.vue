<template lang="pug"> 
VList(space-y="default")
  LandmarkUserListItem(:item="item" v-for="item in data")

</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { data } = defineProps<{
  data: StakingItemFragment[]
}>()

</script>