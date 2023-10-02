<template lang="pug">
VList(gap="4" uppercase="~")
  ListSection
    template(#title)
      div(font="bold") {{ $t(`overview.mcLevel`) }}

    template(#details)
      OverviewPerksSummary(p="l-5") 

  div(v-for="contract in availableContracts")
    ListSection(v-if="displayContract(contract) && contract.ring == 'B'")
      template(#title)
        div(font="bold") {{$t(`overview.artemis`)}}

      template(#details)
        OverviewTilesSummary(p="l-5" :contract="contract")

  div(v-for="contract in availableContracts")
    ListSection(v-if="displayContract(contract) && contract.ring == 'C1'")
      template(#title)
        div(font="bold") {{$t(`overview.chronos`)}}

      template(#details)
        OverviewTilesSummary(p="l-5" :contract="contract")

  div(v-for="contract in availableContracts")
    ListSection(v-if="displayContract(contract) && contract.ring == 'C2'")
      template(#title)
        div(font="bold") {{$t(`overview.helios`)}}

      template(#details)
        OverviewTilesSummary(p="l-5" :contract="contract")

</template>

<script lang="ts" setup>
import type { TileContract } from '~~/composables/useTileContract'

const { availableContracts } = useTileContract()
const { tokenInfoForRing } = useTileRings()

const displayContract = (contract: TileContract) => {
  if (contract.ring == 'B')
    return true
  if (contract.ring == 'C1')
    return true
  if (contract.ring == 'C2')
    return true
  const data = tokenInfoForRing(contract.ring)
  return data?.staked == true
}

</script>