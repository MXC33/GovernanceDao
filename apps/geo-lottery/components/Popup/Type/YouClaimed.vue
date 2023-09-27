<template lang="pug">
PopupBlank()
  VList(w="full" h="full")
    img(src="~/assets/images/bg-you-win-img.png" inset="0" z="-1" h="auto" w="full" pos="absolute" top="0 md:50%" translate-y="-50%")
    VList(w="full" pos="relative" m="auto" z="1000" max-w="150" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden")
      VList(flex-grow="1" p="4 md:6" items="center" gap-y="5")
        h1(text="3xl md:5xl lg:6xl center" font="bdrA3mik" whitespace="pre-wrap") You Claimed
        div( w="450px" h="450px" mb="2")
          //iframe(:src="popup.nft_link"

        ClaimIframe(:url="iframeURL" w="full" h="full")
        Button(:value="'pink'" w="100% sm:390px"  @click="onClose" ) Close

</template>
<script lang="ts" setup>
const { closeActivePopup, popup } = usePopups()

const onClose = () => {
  closeActivePopup()
}

const { lotteryId, tokenId } = defineProps<{
  lotteryId: number,
  tokenId: number
}>()

const baseURI = BASE_API_ENDPOINT_URL()

const iframeURL = computed(() =>
  `${baseURI}/geo/lottery/token/${tokenId}/claimed/${lotteryId}`
)

</script>
