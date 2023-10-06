<template lang="pug">
Game()
VList(bg="black opacity-50" pos="absolute" inset="0" backdrop="~ blur-lg" justify="center" items="center" v-if="showUnderConstruction")
  div(color="white" uppercase="~ " tracking="widest" font="druk" text="2xl" text-shadow="mc-orange")  under construction
</template>

<script lang="ts" setup>
const { isClaimAndUnstakeOpen } = useClaimAndUnstakeAll()

definePageMeta({
})

const { fetchGameAssets } = useUserData()
const { execute: fetchGasPrice } = useAsyncGasPrice()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()
const { execute: fetchOldStakedOnTileData, data: oldStakedOnTileData } = useOldStakedOnTileData()
await Promise.all([fetchGameAssets(), fetchOldStakedOnTileData()])
await fetchBaseLevelCapacity()

const showUnderConstruction = computed(() => false)

if (process.client)
  await fetchGasPrice()


const hasSomethingStaked = computed(() =>
  oldStakedOnTileData.value
    .map(item => item.base)?.some(element => element != null)
)

onMounted(() => {
  if (hasSomethingStaked.value) {
    isClaimAndUnstakeOpen.value = true
  }
})

</script>
