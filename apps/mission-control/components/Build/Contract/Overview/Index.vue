<template lang="pug">
ListContainer()
  template(v-for="contract in availableContracts")
    BuildContractOverviewItem(:contract="contract" v-if="displayContract(contract)")

</template>

<script setup lang="ts">
import type { TileContract } from '~~/composables/useTileContract';

const { availableContracts } = useTileContract()
const { tokenInfoForRing } = useTileRings()

const displayContract = (contract: TileContract) => {
  if (contract.ring == 'A')
    return true

  const data = tokenInfoForRing(contract.ring)

  return data?.staked == true
}
</script>