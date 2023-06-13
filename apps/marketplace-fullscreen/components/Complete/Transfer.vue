<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) {{ $t(`marketplace.transfer.transferSucess`) }}

  template(#default)
    CompleteTokenList(:items="[item]")

    VList()
      HList(justify="between" font="bold" text="sm")
        div(w="full") {{ $t(`marketplace.transfer.transferTo`) }}
          div(p="2" space-x="0.5" w="full" frame="~" items="center" opacity="60") {{ item.toWallet }}


  template(#buttons)
    HList( justify="between")
      button(@click="onClickMyAssets" btn="~ secondary" w="full") {{ $t(`marketplace.offer.goToMyAssets`) }}
      button(@click="closeActivePopup" btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

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
  