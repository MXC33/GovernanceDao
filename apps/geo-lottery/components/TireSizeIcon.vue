<template lang="pug">
HList(items="center")
  div(v-for="(item, index) in itemSize" h="full on-selected:full" :selected="selected(item)" mx="1" rounded="2" scale="on-selected:120")
    img(:src="'/s3/nft/images/'+item.toLowerCase()+'/icon-'+tier.toLowerCase()+'.png'" w="full" h="20")
</template>
<script lang="ts" setup>
const itemSize = ['area', 'sector', 'zone', 'domain']
const selected = (item: string) => {
  if (item.toLowerCase() == size.toLowerCase()) {
    return true
  }
  return false
}

const { tier, size } = defineProps<{
  tier?: string,
  size?: string,
}>()
</script>
<style>
</style>
