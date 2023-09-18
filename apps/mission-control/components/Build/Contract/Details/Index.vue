<template lang="pug">
VList(space-y="4" flex-grow="1")
  VList(px="2" gap="4")
    BuildContractDetailsRentalToken(:token="astroGoldToken" @click="navigateTo('/astro-cap')" v-if="!isFree")
    BuildContractDetailsRentalToken(:token="astroGoldLiteToken" @click="navigateTo('/astro-cap')" v-if="!isFree && hasALITE")
    BuildContractDetailsRentalToken(:token="genesisToken" v-if="hasGenesis && !isFree" :needs-stake="true")


  ListSection(:title="`DISTRICT ${contract.ring}`")
    BuildContractSummary(:contract="contract")

    VList()
      BuildContractDetailsTile(:tile-group="initialState[index]" :index="index" v-model="adjustedState[index]", v-for="(item, index) in adjustedState" :is-free="isFree")

  VList(p="4" pos="sticky bottom-0" bg="black opacity-60" backdrop="blur-md")
    button(btn="~ secondary on-disable:disable" @click="confirmRent" v-if="!isFree" :disable="!hasChanges") {{ $t(`general.confirm`) }}
      
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'
import type { TileContract } from '~~/composables/useTileContract';
import type { RentProposalList } from '~~/composables/useTileRent';
import type { TileGroup } from '~~/composables/useTiles';

const { tileGroupsInRing, isRented } = useTiles()
const { tileGroups } = useTileData()
const { setProposal, cancelProposal } = useTileRentProposal()
const { tokenOwnedState } = useMaybeStakedTokenState()
const { balanceOfToken } = useUserData()
const { astroGoldToken, astroGoldLiteToken } = useCurrencyData()
const { getTokenFromAddress } = useTileRent()
const genesisToken: NftFragment = { tokenInfo: { type: 'genesis', tier: 'new-lands' } }
const aGoldLite: NftFragment = { tokenInfo: { type: 'astro-gold-lite' } }

const hasGenesis = computed(() => tokenOwnedState(genesisToken) != 'not-owned')

const props = defineProps<{
  contract: TileContract
}>()

onBeforeUnmount(() => cancelProposal())

const initialState = ref<TileGroup[]>([])
const adjustedState = ref<boolean[]>([])

const isFree = computed(() => props.contract.ring == 'A')

onMounted(() =>
  setupTileGroups()
)

const hasALITE = computed(() => balanceOfToken(aGoldLite) > 0)

watch(tileGroups, () =>
  setupTileGroups()
)

const setupTileGroups = () => {
  const tileGroups = tileGroupsInRing(props.contract.ring)

  initialState.value = tileGroups
  adjustedState.value = tileGroups.map((group) => isRented(group))
}

const hasChanges = computed(() =>
  diffList.value.filter((item) => item != null).length > 0
)


const diffList = computed<RentProposalList>(() =>
  initialState.value.map((group, index) => {
    const rented = isRented(group)
    if (rented != adjustedState.value[index])
      return {
        tile: group.tile,
        rentalToken: group.rentalToken ?
          getTokenFromAddress(group.rentalToken) : null,
        isRented: adjustedState.value[index]
      }
    else
      return null
  })
)

const confirmRent = () => {
  const list = diffList.value.filter((item) => !!item)
  setProposal(list)
}
</script>
