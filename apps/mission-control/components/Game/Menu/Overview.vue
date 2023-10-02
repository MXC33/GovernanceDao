<template lang="pug">
Slideout(:title="$t(`general.navigation.overview`)" :is-open="gameMenu == 'overview'" @close="gameMenu = null" :is-nested="subMenuOpen" @step-back="onClickStepBack")
  template(#nested-header)
    GlitchText(:text="nestedTitle")

  template(#default)
    Overview()

</template>

<script setup lang="ts">
const gameMenu = useGameMenu()
const { clearStaking } = useStakeNFTContracts()
const { buildSelectionGroup } = useBuildTools()
const { selectedContract } = useTileContract()
const { getRingName } = useTileRings()

const subMenuOpen = computed(() =>
  buildSelectionGroup.value != null ||
  selectedContract.value != null
)

const nestedTitle = computed(() => {
  if (buildSelectionGroup.value) {
    const { tier, type } = buildSelectionGroup.value?.tokenInfo
    return `${tier} ${type}`
  }

  if (selectedContract.value) {
    return getRingName(selectedContract.value.ring)
  }
})

const onClickStepBack = () => {
  selectedContract.value = null
  buildSelectionGroup.value = null
  clearStaking()
}
</script>