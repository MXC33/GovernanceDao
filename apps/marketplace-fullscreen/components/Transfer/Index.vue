<template lang="pug">
Popup(@close="$emit('close')")
  template(#icon)
    TransferIcon()

  template(#header) {{ $t(`marketplace.transfer.title`) }}

  template(#default)
    VList(space-y="3")
      TransferInfo(v-for="(_, index) in transferItem" v-model="transferItem[index]" :showAdjustable="isERC1155")

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
import TransferIcon from '~/assets/icons/transfer.svg'
import Checkbox from "../Input/Checkbox.vue";
const { displayPopup } = usePopups()

const { transferItem, createTransferItem, transferERC1155NFT, transferERC721NFT } = useTransfer()

const isLoading = ref(false)
const wallet = ref("")
const oldWalletAdress = ref("")
const isChecked = ref(false)

defineEmits(['close'])

const { items } = defineProps<{
  items: IXToken[],
}>()

const onChange = () => {
  if (wallet != oldWalletAdress) {
    isChecked.value = false;
    oldWalletAdress.value = wallet.value;
  }
}

const isWalletValid = computed(() => wallet.value.length > 25 && wallet.value.substring(0, 2) == '0x')

const isERC1155 = computed(() => ERC1155Addresses.includes(items[0].collection.toLowerCase()))

const itemTransfer = async () => {
  const collection = transferItem.value[0].token.collection

  isLoading.value = true
  const transfer = await transferNFTType(collection)
  isLoading.value = false
  if (transfer) {
    displayPopup({
      type: 'transfer-item-successful',
      items: {
        ...transferItem.value,
      }
    })
  }

}


const transferNFTType = async (collection: string) => {

  if (isERC1155.value)
    return await transferERC1155NFT(collection, wallet.value, transferItem.value)

  return await transferERC721NFT(collection, wallet.value, transferItem.value)
}

createTransferItem(items, wallet.value)

</script>