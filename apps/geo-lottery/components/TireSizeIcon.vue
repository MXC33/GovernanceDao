<template lang="pug">
HList(items="center")
  div(v-for="(item, index) in itemSize"  max-w="80px" scale="100 on-selected:130" :selected="selected(item)")
    img(:src="'/s3/nft/images/'+item.toLowerCase()+'/icon-'+tier.toLowerCase()+'.png'")
</template>
<script lang="ts" setup>
const itemSize = ['area', 'zone', 'sector', 'domain']
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
