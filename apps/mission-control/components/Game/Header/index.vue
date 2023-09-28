<template lang="pug">
HList(w="full" v-if="!proposedNFTStake" bg="gradient-to-b gradient-from-black/80 gradient-to-transparent)" pos="relative" pointer-events="auto")

  div(w="15%" display="lt-md:none")
    UserHeaderProfile(display="lt-md:none" self="start" w="full")

  HList(flex-grow="1" justify="md:center" items="center" w="full" overflow-x="lt-md:auto" pos="relative")

    transition(name="slide-top")
      GameHeaderResources(v-if="displayHeader")
        template(#hoverInfo)

  div(w="15%" display="lt-md:none")

div(v-else color="mc-mint" position="absolute top-0 right-0" ml="auto" text="center" p="4" uppercase="~") {{$t(`game.header.place`)}} {{ proposedNFTStake.nft.tokenInfo?.tier }} {{ proposedNFTStake.nft.tokenInfo?.type }} {{$t(`game.header.onEmpty`)}}
</template>

<script lang="ts" setup>
const { proposedNFTStake } = useStakeNFTFlow()
const { refresh: refreshGasPrice } = useAsyncGasPrice()

const displayHeader = ref(false)
const interval = ref(null)

onMounted(() => {
  setTimeout(() => displayHeader.value = true, 150)
  interval.value = setInterval(() => refreshGasPrice(), 10 * 1000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

</script>
