<template lang="pug">
VList() 
  HList(space-x="3")
    HList()
      TokenImage(:token="props.IXToken" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(props.IXToken)")
      VList()
        div() {{getTokenName(props.IXToken)}} 
        div() "{Collection name}"  

    div(flex="grow")
    VList(items="center")
      div(v-html="$t(`mpFullscreen.transfer.own`)") 
      div() {{hardCodedMax}}          

  VList(v-if="showAdjustable" space-y="3")
    div(v-html="$t(`mpFullscreen.transfer.quantity`)") 
    Adjustable(v-model="props.IXToken" h="10")
</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const props = defineProps<{
  IXToken: AnyToken,
  showAdjustable: boolean,
}>()

const { getTokenKey, getTokenName } = useTokens()
const hardCodedMax = 10
const quantity = ref(0)
const NFT_Index = 0;
</script>