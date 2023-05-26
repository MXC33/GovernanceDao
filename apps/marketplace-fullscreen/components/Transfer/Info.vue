<template lang="pug">
VList(v-if="item") 
  HList(space-x="3")
    HList()
      TokenImage(:token="item.token" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(item.token)")
      VList()
        div() {{getTokenName(item.token)}} 
        div() "{Collection name}"  

    div(flex="grow")
    VList(items="center")
      div(v-html="$t(`marketplace.transfer.own`)") 
      div() {{item.token.my_shares}}          

  VList(v-if="showAdjustable" space-y="3")
    div(v-html="$t(`marketplace.transfer.quantity`)") 
    Adjustable(v-model="item" h="10")
</template>

<script lang="ts" setup>
import type { TransferItem } from '~/composables/useTransfer';

const props = defineProps<{//props can not be changed/mutated
  showAdjustable: boolean,
}>()

const item = defineModel<TransferItem>()//v-Model in parent can be changed/mutated

const { getTokenKey, getTokenName } = useTokens()

</script>