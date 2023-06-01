<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) TRANSFER SUCCESSFUL!

  template(#default)
    VList(min-h="30" p="2" space-x="0.5" w="full" frame="~" )
      TokenImage(:token="item.token")
      HList(justify="between" font="bold" text="sm" )
        TokenName(:token="item.token")
        div x{{ item.value }}

    VList()
      HList(justify="between" font="bold" text="sm")
        div(w="full") Transfer to
          div(p="2" space-x="0.5" w="full" frame="~" items="center" opacity="60") {{ item.toWallet }}


  template(#buttons)
    HList()
      button(@click="onClickMyAssets" btn="~ secondary") Go to my assets
      button(@click="closeActivePopup" btn="~ primary") Continue exploring 

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { TransferItem } from '~/composables/useTransfer';

const { closeActivePopup } = usePopups()
const { item } = defineProps<{
  item: TransferItem
}>()

const onClickMyAssets = () => {
  navigateTo('/account/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
  