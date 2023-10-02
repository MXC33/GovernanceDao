<template lang="pug">
VList(min-h="md:0" grid="col-span-1" v-if="selectedNFT")
  IconFrameWithCorner(pos="relative" bg="mc-black opacity-60" backdrop="~ blur-md" )
    TokenMedia(:token="selectedNFT" :is-large="true")

</template>

<script setup lang="ts">

const { selectedNFT } = useInventory()

defineProps<{
  disableBgAnimation?: boolean
}>()
</script>