<template lang="pug">
div(pos="absolute right-0 top-0" m="t-0" w="50 md:100")
  a(:href="activeAd.url")
    img(:src="imageSrc" w="full")
  Close(pos="absolute right-4 top-50%" translate-y="-50%" w="2 md:3" cursor="pointer" @click="onClickClose")
</template>

<script lang="ts" setup>

import Close from '~/assets/images/icons/close.svg'

const { boxAdActive, activeAd } = useAds()
const onClickClose = () => {
  boxAdActive.value = false
}

const imageSrc = computed(() => `/splash/${activeAd.value.id}/box.png`)

</script>
