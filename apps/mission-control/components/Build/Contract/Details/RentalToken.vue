<template lang="pug">
VList(gap="2")
  ListItemOutline()
    template(#iconLeft)
      TokenImage(:token="token" h="full")

    template(#default)
      TitleWithIcon(icon='half-circle' font="bold")
        TokenName(:token="token")

      div {{ descriptionCopy }}

      TitleWithIcon(icon='cut-corner' fill="on-active:mc-mint on-pending:mc-yellow white" color="on-active:mc-mint on-pending:mc-yellow" :active="isTokenActive" :pending="balanceState == 'pending'")
        div {{ statusCopy }}

    template(#rightSlot v-if="balanceState == 'staked'")
      
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { anyTilesRented, getAddressFromToken } = useTileRent()
const { t } = useI18n()
const { balanceOfToken } = useUserData()
const { tokenOwnedState } = useMaybeStakedTokenState()
const balanceState = computed(() => tokenOwnedState(props.token))

const props = defineProps<{
  token: NftFragment,
  needsStake?: boolean
}>()

const balance = computed(() =>
  balanceOfToken(props.token)
)

const address = computed(() => getAddressFromToken(props.token))
const isRented = computed(() => anyTilesRented(address.value))

const descriptionCopy = computed(() => {
  if (props.needsStake) {
    if (balanceState.value == 'staked')
      return t('overview.free-rent')
    else
      return t('overview.unlocks-free-rent')
  }

  return `${t('general.balance')} ${balance.value}`
})

const statusCopy = computed(() => {
  if (balanceState.value == 'owned' && props.needsStake)
    return t(`overview.stake-at-newlands`)

  if (balanceState.value == 'owned' && !isRented.value)
    return t('general.inactive')

  if (balanceState.value == 'pending')
    return t('general.pending')

  if (isTokenActive.value)
    return t('general.active')

  return t(`general.visit-ac`)
})

const isTokenActive = computed(() =>
  balanceState.value == 'staked' || isRented.value
)

</script>

<style></style>
