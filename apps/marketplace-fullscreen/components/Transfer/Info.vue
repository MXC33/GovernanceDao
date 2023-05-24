<template lang="pug">
VList() 
  HList(space-x="3")
    HList()
      TokenImage(:token="collectionData.nfts[NFT_Index]" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(collectionData.nfts[NFT_Index])")
      VList()
        div() {{getTokenName(collectionData.nfts[NFT_Index])}} 
        div() "{Collection name}"  

    div(flex="grow")
    VList(items="center")
      div(v-html="$t(`mpFullscreen.transfer.own`)") 
      div() {{hardCodedMax}}          

  VList(v-if="isERC1155" space-y="3")
    div(v-html="$t(`mpFullscreen.transfer.quantity`)") 
    Adjustable(v-model="quantity" h="10")
</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';

const props = defineProps<{
    collectionData: CollectionData,
}>()
const isERC1155 = computed(() => ERC1155Addresses.includes(props.collectionData.collection.toLowerCase()))
const { getTokenKey, getTokenName } = useTokens()
const hardCodedMax = 10
const quantity = ref(0)
const NFT_Index = 0;
</script>