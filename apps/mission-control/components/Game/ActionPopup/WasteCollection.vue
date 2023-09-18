<template lang="pug">
GameActionPopup(:title="$t(`general.collected.collectedWaste`)" :confirm-text="$t(`general.claim`)" @cancel="onClickCancel" @confirm="onClickPick" :disable-confirm="currentWasteLeft > 0") 
  div(flex="~ col" m="y--2 x--4")

    div(flex="~ row" items="center" space-x="2" px="4" key="1")
      TokenImage(:token="waste" w="15")
      div(font="bold" uppercase="~") {{ currentPickedWaste }} {{$t(`general.collected.waste`)}}

    div(v-if="currentWasteLeft > 0" key="2" text="mc-yellow" p="x-4 t-4" b="t-1 $mc-secondary_40") {{$t(`general.collected.youMust`)}}

</template>

<script lang="ts" setup>
const { currentWasteLeft, currentPickedWaste, discardPickedWaste, getWasteToMint } = useWaste()

const { proposePickResources } = useStakeNFTFlow()
const gameMenu = useGameMenu()

const onClickCancel = () => {
  discardPickedWaste()
  gameMenu.value = null
}
const { data: waste, execute: fetchWasteToken } = useTokenInfo(7)
await fetchWasteToken()

const onClickPick = () => {
  const { tiles, totalWaste } = getWasteToMint()
  gameMenu.value = null
  const positions: number[] = Array(tiles.length).fill(0)
  proposePickResources(tiles, 'waste', totalWaste, positions)
}

</script>