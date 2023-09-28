<template lang="pug">
VList(min-h="0")
  CorporationBorderBox(:title="title" flex-grow="1" min-h="md:0" overflow-y="auto" scrollbar="~ md:mc" p="0")
    VList(flex-grow="1" gap="4" p="4")
      slot(v-if="$slots.default") 
      CorporationStakeActiveItem(v-else-if="activeStakeItem" :item="activeStakeItem" :key="getNftTokenKey(activeStakeItem.token)")

</template>
    
<script lang="ts" setup>
const { activeStakeItem } = useCorporationStake()
const { getNftTokenKey } = useNFTs()
defineProps<{
  title: string
}>()

</script>