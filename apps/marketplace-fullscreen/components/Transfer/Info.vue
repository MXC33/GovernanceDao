<template lang="pug">
VList(v-if="token") 
  HList(space-x="3")
    HList()
      TokenImage(:token="token" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(token)")
      VList()
        div() {{getTokenName(token)}} 
        div() "{Collection name}"  

    div(flex="grow")
    VList(items="center")
      div(v-html="$t(`mpFullscreen.transfer.own`)") 
      div() {{token}}          

  VList(v-if="showAdjustable" space-y="3")
    div(v-html="$t(`mpFullscreen.transfer.quantity`)") 
    Adjustable(v-model="token" h="10")
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const props = defineProps<{
  showAdjustable: boolean,
}>()

const token = defineModel<IXToken>()

const { getTokenKey, getTokenName } = useTokens()
const hardCodedMax = 10
const quantity = ref(0)
const NFT_Index = 0;
</script>