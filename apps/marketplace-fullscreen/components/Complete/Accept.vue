<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) {{ $t(`marketplace.offer.acceptOffer`) }}

  template(#default)
    CompleteTokenList(:items="[item]")

  template(#footer)
    AcceptingPrice(:item="item")

  template(#buttons)
    HList()
      button(@click="onClickAssets" btn="~ secondary" w="full") {{ $t(`marketplace.offer.viewMyAssets`) }}
      button(@click="closeActivePopup" btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

</template>


<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { TransactionItem } from '~/composables/useTransactions';
const { closeActivePopup } = usePopups()

const { item } = defineProps<{
  item: TransactionItem
}>()


const onClickAssets = () => {
  navigateTo('/account')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
