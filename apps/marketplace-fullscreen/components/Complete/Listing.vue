<template lang="pug">
PopupBase()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) {{ $t(`marketplace.list.listSucess`) }}

  template(#default)
    CompleteTokenList(:items="items")

  template(#footer)
    ListingPrice(:items="items")

  template(#buttons)
    HList()
      button(@click="onClickActiveListings" btn="~ secondary" w="full") {{ $t(`marketplace.offer.viewInActiveList`) }}
      button(@click="closeActivePopup" btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { ListingItem } from '~/composables/useListing';
const { closeActivePopup } = usePopups()
const { items } = defineProps<{
  items: ListingItem[]
}>()

const mappedTokens = computed(() => items.map((item) => item.token))
console.log("Token", mappedTokens.value)

const onClickActiveListings = () => {
  navigateTo('/account/active-listings')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
  