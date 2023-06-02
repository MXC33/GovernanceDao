<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) Buy Successful!

  template(#default)
    CompleteTokenList(:items="items")

  template(#footer)
    BiddingPrice(:items="items")

  template(#buttons)
    button(@click="onClickAssets" btn="~ secondary" w="full") View my assets
    button(@click="closeActivePopup" btn="~ primary" w="full") Continue exploring 

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { TransactionItem } from '~/composables/useTransactions';
const { closeActivePopup } = usePopups()

const { items } = defineProps<{
  items: TransactionItem[]
}>()


const onClickAssets = () => {
  navigateTo('/account')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
  