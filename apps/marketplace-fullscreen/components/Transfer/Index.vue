<template lang="pug">
Popup(@close="$emit('close')")
  template(#icon)
    TransferIcon()

  template(#header) {{ $t(`marketplace.transfer.title`) }}

  template(#default)
    VList(space-y="3")
      TransferInfo(v-model="transferItem" :showAdjustable="isERC1155")

      div(font="bold") {{ $t(`marketplace.transfer.transferTo`)  }}

      HList(frame="~" p="2" outline="0")
        input(bg="transparent"  placeholder="e.g 0x1a2..." v-model="wallet" @input="onChange" w="full")

  template(#footer)
    HList(space-x="3" disable="on-invalid:active" :invalid="!isWalletValid")
      Checkbox(v-model="isChecked") 
      div(text="sm") {{ $t(`marketplace.transfer.verifyText`) }}

  template(#buttons)
    ButtonInteractive(btn="~ primary" disable="on-invalid:active" :invalid="!isChecked || !isWalletValid" @click="itemTransfer" :loading="isLoading" text="Transfer") {{  $t(`marketplace.transfer.transferItem`) }}

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import type { TransferItem } from '~/composables/useTransfer';
import TransferIcon from '~/assets/icons/transfer.svg'
import Checkbox from "../Input/Checkbox.vue";
const { transferERC1155NFT, transferERC721NFT } = useTransferNFT()
const { displayPopup } = usePopups()

const isLoading = ref(false)
const wallet = ref("")
const oldWalletAdress = ref("")
const isChecked = ref(false)

defineEmits(['close'])

const props = defineProps<{
  token: IXToken,
}>()

const transferItem = ref<TransferItem>({
  token: props.token,
  value: 1,
  min: 1,
  max: props.token.my_shares,
})

const onChange = () => {
  if (wallet != oldWalletAdress) {
    isChecked.value = false;
    oldWalletAdress.value = wallet.value;
  }
}

const isWalletValid = computed(() => wallet.value.length > 25 && wallet.value.substring(0, 2) == '0x')

const isERC1155 = computed(() => ERC1155Addresses.includes(props.token.collection.toLowerCase()))

const itemTransfer = async () => {
  console.log('transfering Item proccess starting')
  console.log(wallet.value)
  const { token_id, collection } = transferItem.value.token

  if (token_id == null)
    return console.log("ERROR, no token ID")

  isLoading.value = true
  const transfer = await transferNFTType(collection, token_id)
  isLoading.value = false
  if (transfer) {
    displayPopup({
      type: 'transfer-item-successful',
      item: {
        ...transferItem.value,
        toWallet: wallet.value
      }
    })
  }

}


const transferNFTType = async (collection: string, token_id: number) => {

  if (isERC1155.value)
    return await transferERC1155NFT(collection, wallet.value, token_id, transferItem.value.value)

  return await transferERC721NFT(collection, wallet.value, token_id)
}


</script>