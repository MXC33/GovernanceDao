<template lang="pug">
Popup(@close="$emit('close')")
  template(#icon)
    TransferIcon()

  template(#header) {{ $t(`mpFullscreen.transfer.title`) }}

  template(#default)
    VList(space-y="3")
      //-Title Image Collection how many you have  
      TransferInfo(v-model="transferItem" :showAdjustable="isERC1155")

      div(v-html="$t(`mpFullscreen.transfer.walletAdress`)")

      input(bg="transparent" b="0.5 gray-600" p="3" outline="0" placeholder="e.g 0x1a2..." v-model="wallet" @input="onChange")

      div(v-html="$t(`mpFullscreen.transfer.warningText`)")

  template(#footer)
    HList(space-x="3" disable="on-invalid:active" :invalid="!isWalletValid")
      FormCheckbox(v-model="isChecked") 
      div(v-html="$t(`mpFullscreen.transfer.verifyText`)")

  template(#buttons)
    button(btn="~ primary" disable="on-invalid:active" :invalid="!isChecked || !isWalletValid" @click="itemTransfer") {{  $t(`mpFullscreen.transfer.transferItem`) }}

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import type { TransferItem } from '~/composables/useTransfer';
import TransferIcon from '~/assets/icons/transfer.svg'

defineEmits(['close'])

const props = defineProps<{
  token: IXToken,
}>()

const transferItem = ref<TransferItem>({
  token: props.token,
  value: 1,
  min: 1,
  max: props.token.my_shares
})

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
//&& wallet.value.substring(0, 2) == '0x'
const isWalletValid = computed(() => wallet.value.length > 25 && wallet.value.substring(0, 2) == '0x')
const isERC1155 = computed(() => ERC1155Addresses.includes(props.token.collection.toLowerCase()))

const itemTransfer = () => {
  console.log('transfering Item proccess starting')
  console.log(wallet.value)
  const { token_id, collection } = transferItem.value.token
  // console.log(props.collectionData)
  // console.log(props.collectionData.collection)
  if (token_id == null)
    return console.log("ERROR, no token ID")

  if (isERC1155.value)
    return transferERC1155NFT(collection, wallet.value, token_id, transferItem.value.value)

  return transferERC721NFT(collection, wallet.value, token_id)
}
</script>