<template lang="pug">
ClientOnly
  HList(w="full" px="6" py="3" bg="gray-900" items="center" justify="between")
    HList(space-x="6")
      HelperHover(tooltip-id="like")
        LikeIcon(w="4.5" cursor="pointer")

      HelperHover(tooltip-id="transfer")
        TransferIcon(w="4.5" cursor="pointer" @click="$emit('transfer')")

      HelperHover(tooltip-id="link")
        LinkIcon(w="5" cursor="pointer" @click="copyCurrentUrlToClipboard")

    HelperHover(tooltip-id="chain")
      HList()
        PolygonIcon(w="4.5" cursor="pointer")

</template>

<script lang="ts" setup>
import LikeIcon from '~/assets/icons/like.svg'
import TransferIcon from '~/assets/icons/transfer.svg'
import LinkIcon from '~/assets/icons/link.svg'
import PolygonIcon from '~/assets/icons/polygon.svg'

defineEmits(["transfer"])

const { displayNotification } = useNotifications()

const copyCurrentUrlToClipboard = async () => {
  const currentUrl = window.location.href;

  try {
    await navigator.clipboard.writeText(currentUrl)
  } catch (error) {
    console.error('Failed to copy URL to clipboard:', error)
  }
  displayNotification('copy-link')
}

</script>

<style>
.infobox {
  padding: 10px;
}
</style>
