
<template lang="pug">
PopupTokenItemContainer(:link="linkItem")
  template(#default)
    TokenName(:token="item")

  template(#action) 
    span(color="mc-mint") {{ linkItem.text }}

</template>


<script setup lang="ts">
import type { PopupTokenInfoBalance, PopupTokenLink } from '~~/composables/usePopupToken';


const { balanceOfToken } = useUserData()

const balance = computed(() => balanceOfToken(props.item))

const linkItem = computed<PopupTokenLink>(() => ({
  to: '/',
  text: `${balance.value}X`
}))

const props = defineProps<{
  item: PopupTokenInfoBalance
}>()
</script>
