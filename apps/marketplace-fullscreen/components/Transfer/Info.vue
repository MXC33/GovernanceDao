<template lang="pug">
VList(v-if="item" p="y-3" frame="~" bg="gray-800") 
  HList()
    HList( w="full" space-x="3" space-y="3")
      TokenImage(:token="item.token" inset="0" w="25" h="25" object="contain center" :key="getTokenKey(item.token)" )
      VList()
        div(font="bold") {{getTokenName(item.token)}} 
        div(text="xs" opacity="60") {{useCollectionName(item.token.collection)}}

  div(b="b-0.5 gray-600" opacity="40")
  VList(v-if="showAdjustable" space-y="3"  p="x-6" )
    div(font="bold" p-t="6") {{ $t(`marketplace.transfer.quantity`) }}
    HList(justify="between")
      Adjustable(v-model="item.shares" h="10" w="100")
      button(bg=" hover:gray-400" transition="all" b="1 white opacity-40" cut="bottom-right sm b-gray-400" p="x-6"  @click="onMaxButton") {{ $t(`marketplace.transactions.max`) }}
    VList(text="xs" opacity="60" )
      div() {{ $t(`marketplace.transfer.own`) + item.token.my_shares }}
    
</template>

<script lang="ts" setup>
import type { TransferItem } from '~/composables/useTransfer';

const item = defineModel<TransferItem>()

defineProps<{
  showAdjustable: boolean,
}>()

const onMaxButton = () => {
  if (!item.value)
    return
  item.value.shares.value = item.value?.token.my_shares
}

console.log(item.value)
const { getTokenKey, getTokenName } = useTokens()

</script>