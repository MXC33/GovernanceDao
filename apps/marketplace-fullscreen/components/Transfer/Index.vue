<template lang="pug">
Popup(@close="$emit('close')")
  template(#header)
    div(text="2xl" v-html="$t(`mpFullscreen.transfer.title`)")
  
  template(#default)
    VList(space-y="3")
      //-Title Image Collection how many you have  
      TransferInfo(v-model="transferToken" :showAdjustable="isERC1155")

      div(v-html="$t(`mpFullscreen.transfer.walletAdress`)")
      
      input(text="2xl center" bg="black" placeholder="e.g 0x1a2..." border="" v-model="wallet" @input="onChange")
      
      div(v-html="$t(`mpFullscreen.transfer.warningText`)")
  
  template(#footer)
    VList(space-y="6")
      Transition(name="slide-top")
        HList(space-x="3" v-if="wallet")
          FormCheckbox(v-model="isChecked") 
          div(v-html="$t(`mpFullscreen.transfer.verifyText`)")

      Transition(name="slide-top")
        button(m="auto" text="~" bg="gray-600" b="~" p="2" w="full" v-if="isChecked && wallet" @click="itemTransfer" v-html="$t(`mpFullscreen.transfer.transferItem`)")
</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import type { IXToken } from "@ix/base/composables/Token/useIXToken"

defineEmits(['close'])

const props = defineProps<{
  token: IXToken,
}>()

const transferToken = ref<IXToken>(props.token)

const { transferERC1155NFT, transferERC721NFT } = useTransferNFT()

const wallet = ref("")
const oldWalletAdress = ref("")
const isChecked = ref(false)

const onChange = () => {
  if (wallet != oldWalletAdress) {
    isChecked.value = false;
    oldWalletAdress.value = wallet.value;
  }
}

const isERC1155 = computed(() => ERC1155Addresses.includes(transferToken.value.collection.toLowerCase()))

const itemTransfer = () => {
  console.log('transfering Item proccess starting')
  console.log(wallet.value)
  const {token_id, collection} = transferToken.value
  // console.log(props.collectionData)
  // console.log(props.collectionData.collection)
  if (token_id == null)
    return console.log("ERROR, no token ID")

  console.log(transferToken.value.attributes.values)

  if (isERC1155.value)
    return transferERC1155NFT(collection, "0x33aB691A742EbfB9ED291F8B989F9A792677E989", token_id, 1)

  return transferERC721NFT(collection, "0x33aB691A742EbfB9ED291F8B989F9A792677E989", token_id)
}
</script>