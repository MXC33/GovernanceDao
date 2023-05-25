<template lang="pug">
ClientOnly
  HList(w="full" px="6" py="3" bg="gray-900" items="center" justify="between")
    HList(space-x="6")
      HelperHover(tooltip-id="like")
        LikeIcon(w="4.5" cursor="pointer")

      HelperHover(tooltip-id="transfer")
        TransferIcon(w="4.5" cursor="pointer")

      HelperHover(tooltip-id="link")
        LinkIcon(w="5" cursor="pointer" @click="copyCurrentUrlToClipboard" )

    HelperHover(tooltip-id="chain")
      HList()
        PolygonIcon(w="4.5" cursor="pointer")




</template>

<script lang="ts" setup>
import LikeIcon from '~/assets/icons/like.svg'
import TransferIcon from '~/assets/icons/transfer.svg'
import LinkIcon from '~/assets/icons/link.svg'
import PolygonIcon from '~/assets/icons/polygon.svg'
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

defineEmits(["transfer"])

type Classes = 'like' | 'transfer' | 'link' | 'chain'
const props = defineProps<{
  class?: Classes
}>()


const { activePopup, setPopupTimeout } = usePopups()

const mouseOver = computed(() => {
  switch (props.class) {
    case 'like':
      return 'Add Item to Favorites'
    case 'transfer':
      return 'Transfer Item to Another Wallet'
    case 'link':
      return 'Copy Link to Clipboard'
    case 'chain':
      return 'Chain: Polygon'
  }
})

const copyCurrentUrlToClipboard = async () => {
  activePopup.value = 'copy-link'
  const currentUrl = window.location.href;

  try {
    await navigator.clipboard.writeText(currentUrl)
  } catch (error) {
    console.error('Failed to copy URL to clipboard:', error)
  }
  setPopupTimeout()
}

</script>

<style>
.infobox {
  padding: 10px;
}
</style>