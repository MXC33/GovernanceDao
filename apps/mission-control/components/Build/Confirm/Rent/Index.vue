<template lang="pug">
Popup(:title="$t('build.confirm.rent.title')", @cancel="cancelProposal", @confirm="onClickConfirm" @secondary="onClickSecondary" :use-secondary="displayStakeGenesis" secondary-text="skip" sender="jeremiah" :confirm-text="confirmText") 

  template(v-slot:default) 

    p(v-html="$t('build.confirm.rent.unrentOnly', { count: removeRents.length, tileCount: $t('build.confirm.rent.tileCount', removeRents.length) })" v-if="onlyUnrent")

    p(v-html="$t('build.confirm.rent.genesisTokenNotStaked')" v-else-if="displayStakeGenesis")

    p(v-html="$t('build.confirm.rent.genesisTokenStaked')" v-else-if="genesisState == 'staked'")

    p(v-html="$t('build.confirm.rent.noBalance', selectedToken.tokenInfo.title)" v-else-if="selectedBalance == 0")

    p(v-html="$t('build.confirm.rent.description', { count, tileCount: $t('build.confirm.rent.tileCount', count) })" v-else)

  template(v-slot:images v-if="!onlyUnrent")
    HList(space-x="3" w="full" justify="center" )
      template(v-for="token in availableTokens")
        BuildConfirmRentItem(:token="token" :is-active="isSameNFT(token, selectedToken)" @click="selectedToken = token" v-if="token.tokenInfo.type != 'genesis'")
        TokenDisplay(:token="token" v-else)


</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { proposedTileRental, cancelProposal } = useTileRentProposal()
const { astroGoldLiteToken, astroGoldToken } = useCurrencyData()
const genesisToken: NftFragment = { tokenInfo: { type: 'genesis', tier: 'new-lands' } }
const { tileGroups } = useTileData()
const skipStakingGenesis = ref(false)


const { tokenOwnedState } = useMaybeStakedTokenState()
const { createRentTiles, updateRentTiles, getTilesRentedWithToken } = useTileRent()
const { balanceOfToken } = useUserData()
const { isSameNFT } = useNFTs()
const { t } = useI18n()

const genesisState = computed(() => tokenOwnedState(genesisToken))

const displayStakeGenesis = computed(() =>
  genesisState.value == 'owned' && !skipStakingGenesis.value
)

const onClickSecondary = () => {
  skipStakingGenesis.value = true
}

const availableTokens = computed(() => {
  if (displayStakeGenesis.value || genesisState.value == 'staked')
    return [genesisToken]

  if (balanceOfToken(astroGoldLiteToken.value) > 0)
    return [astroGoldToken.value, astroGoldLiteToken.value]
  else return [astroGoldToken.value]
})

const selectedBalance = computed(() => selectedToken.value && balanceOfToken(selectedToken.value))

const confirmText = computed(() => {
  if (displayStakeGenesis.value)
    return t('general.newLands')

  // console.log('Create', createRents.value, "remove", removeRents.value, "actual payment", actualPayToken.value, "removal payment", firstRemovalToken.value)
  selectedBalance.value == 0 ?
    t('general.astroCap') : t('general.confirm')

})

const firstRemovalToken = computed(() =>
  proposedTileRental.value.find((item) => !item.isRented && item.rentalToken)?.rentalToken
)

const actualPayToken = computed(() =>
  createRents.value?.length == 0 ? firstRemovalToken.value : selectedToken.value
)

const count = computed(() => createRents.value.length + removeRents.value.length)

const selectedToken = ref(availableTokens.value[0])

const onClickConfirm = () => {
  const startRent = createRents.value.length > 0

  if (startRent && displayStakeGenesis.value)
    return navigateTo('/new-lands')

  if (startRent && selectedBalance.value == 0 && genesisState.value != 'staked')
    return navigateTo('/astro-cap')

  confirmRent()
}

const createRents = computed(() => proposedTileRental.value.filter((data) =>
  data.isRented
).map((item) => item.tile))

const removeRents = computed(() =>
  proposedTileRental.value.filter((data) =>
    !data.isRented && isSameNFT(data.rentalToken, actualPayToken.value)
  ).map((item) => item.tile)
)

console.log("Remove", removeRents.value, proposedTileRental.value)

const onlyUnrent = computed(() => {
  if (createRents.value?.length == 0 && removeRents.value?.length != 0)
    return true
  else
    return false
})



const confirmRent = () => {

  const activeRents = getTilesRentedWithToken(tileGroups.value, actualPayToken.value)?.length ?? 0

  // console.log("PAY TOKEN", actualPayToken.value, "Active rents with token", activeRents, "only unrenting?", onlyUnrent.value, "All proposed rents:", proposedTileRental.value, "Create list", createRents.value)

  if (activeRents == 0)
    return createRentTiles(createRents.value, selectedToken.value)
  if (onlyUnrent.value)
    return updateRentTiles(createRents.value, removeRents.value, actualPayToken.value, activeRents)

  updateRentTiles(createRents.value, removeRents.value, selectedToken.value, activeRents)
}
</script>
