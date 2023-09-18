<template lang="pug">
div(p="5" pos="sticky bottom-0" bg="black opacity-90" b="t-1 mc-orange_40" v-if="isViewable")
  button(btn="~ accent uppercase" @click="clickViewLandmark" w="full") {{$t(`inventory.info.landmarkInspector`)}}
</template> 

<script setup lang="ts">


const { selectedNFT } = useInventory()

const isViewable = computed(() => selectedNFT.value?.tokenInfo.type == 'landmark')
const isMobile = useMobileBreakpoint()

const clickViewLandmark = () => {
  const landmark = selectedNFT.value
  const landmarkURL = landmark.external_url
  const newLandmarkURL = landmarkURL.replace("/game/", "/netempire/");

  if (isMobile.value) {
    window.location.assign(newLandmarkURL)
  } else {
    window.open(newLandmarkURL)
  }
}


</script>