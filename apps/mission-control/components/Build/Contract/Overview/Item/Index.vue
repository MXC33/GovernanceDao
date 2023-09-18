<template lang="pug">
ListSection(:title="`DISTRICT ${contract.ring}`")
  template(#default)
    ListItemOutline(@click="selectContract" :is-large="true")
      template(#iconLeft)
        TokenImage(:token="contractData" h="full")

      template(#default)
        TitleWithIcon(icon="half-circle")
          TokenName(:token="contractData")

        HList(items="center") {{ ringName }}

        TitleWithIcon(icon="cut-corner" fill="white on-state-active:green-400")
          div {{ $t(`general.manage-rent`) }}

    BuildContractSummary(:contract="contract")
</template>
  
<script setup lang="ts">
import type { TileContract } from '~~/composables/useTileContract';
const { activateContractMode } = useGameInterface();


const { selectedContract } = useTileContract()
const { getRingName } = useTileRings()

const selectContract = () => {
  selectedContract.value = props.contract
  activateContractMode()
}

const ringName = computed(() => getRingName(props.contract.ring))

const props = defineProps<{
  contract: TileContract
}>()

const { execute: fetchContract, data: contractData } = useTokenInfo(props.contract.tokenId)

await fetchContract()


// const imagePath = computed(() => {
//   switch (props.prompt) {
//     case 'active': return ACTIVE
//     case 'pending': return PENDING
//     case 'default': return DEFAULT
//   }
// })


</script>