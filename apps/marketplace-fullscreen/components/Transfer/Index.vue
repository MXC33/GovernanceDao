<template lang="pug">
Popup(text="white" @close="$emit('close')")
  template(#header)
    div(text="2xl" v-html="$t(`mpFullscreen.transfer.title`)")
  
  template(#default)
    VList(space-y="3")
      //-Title Image Collection how many you have
      TransferInfo(:collectionData="collectionData")
      //-VList(items="center" space-y="3")
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
import type { TransferItem } from '~/composables/useTransfer'
import type { CollectionData } from '~/composables/useCollection';

const item = defineModel<TransferItem>()
const props = defineProps<{
  collectionData: CollectionData,
}>()

const { getTokenKey, getTokenName } = useTokens()
const { transferNFT } = useTransferNFT()

const NFT_Index = 0;
defineEmits(['close'])
const wallet = ref("")
const oldWalletAdress = ref("")
const isChecked = ref(false)

const hardCodedMax = 10
const quantity = ref(0)


const onChange = () => {
  if (wallet != oldWalletAdress) {
    isChecked.value = false;
    oldWalletAdress.value = wallet.value;
  }
}

const isERC1155 = computed(() => ERC1155Addresses.includes(props.collectionData.collection.toLowerCase()))

const itemTransfer = () => {
  console.log('transfering Item proccess starting')
  console.log(wallet.value)
  // console.log(props.collectionData)
  // console.log(props.collectionData.collection)
  if (props.collectionData.nfts[0].token_id == null)
    return console.log("ERROR, no token ID")
  transferNFT(props.collectionData.collection, "0x93aa32bC977812e72C9c5BB87AB34A31633B1404", props.collectionData.nfts[0].token_id, 1)

}
</script>