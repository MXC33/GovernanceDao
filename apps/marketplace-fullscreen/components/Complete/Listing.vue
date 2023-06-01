<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) LIST SUCCESSFUL!

  template(#default)
    VList(min-h="30")
      TokenSlideshow(:tokens="mappedTokens")

    VList()
      HList(justify="between" v-for="item in items" font="bold" text="sm")
        TokenName(:token="item.token")
        div x{{ item.shares.value }}

  template(#footer)
    ListingPrice(:items="items")

  template(#buttons)
    HList()
      button(@click="onClickActiveListings" btn="~ secondary") View in active listings
      button(@click="closeActivePopup" btn="~ primary") Continue exploring 

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
  