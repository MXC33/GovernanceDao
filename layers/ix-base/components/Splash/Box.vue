<template lang="pug">
div(pos="absolute right-0 top-0" m="t-10")
  a(:href="activeAd.url")
    img(:src="imageSrc" w="50 md:100")
  Close(pos="absolute right-1 md:right-4 top-50%" translate-y="-50%" w="4 md:6" cursor="pointer" @click="onClickClose")
</template>

<script lang="ts" setup>

import Close from '../../assets/images/icons/close.svg'

const { boxAdActive, activeAd } = useAds()
const onClickClose = () => {
  boxAdActive.value = false
}

const imageSrc = computed(() => `/splash/${activeAd.value.id}/box.png`)

</script>
