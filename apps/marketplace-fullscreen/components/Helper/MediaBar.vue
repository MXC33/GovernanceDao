<template lang="pug">
HList(w="full" px="6" py="3" bg="gray-900" items="center" justify="between")
  HList(space-x="6")
    LikeIcon(w="4.5" cursor="pointer")
    TransferIcon(w="4.5" cursor="pointer")
    LinkIcon(W="5" cursor="pointer" @click="copyCurrentUrlToClipboard")

  HList()
    PolygonIcon(w="4.5" cursor="pointer")

</template>

<script lang="ts" setup>
import LikeIcon from '~/assets/icons/like.svg'
import TransferIcon from '~/assets/icons/transfer.svg'
import LinkIcon from '~/assets/icons/link.svg'
import PolygonIcon from '~/assets/icons/polygon.svg'

const copyCurrentUrlToClipboard = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log('URL copied to clipboard:', currentUrl);
    })
    .catch((error) => {
      console.error('Failed to copy URL to clipboard:', error);
    });
}

</script>