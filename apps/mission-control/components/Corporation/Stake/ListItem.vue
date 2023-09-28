<template lang="pug">
ListItemOutline(:accented="true" :is-selected="isSelected" @click="onClick" :is-disabled="notOwned" text="normal" :is-large="true")

  template(#iconLeft)
    TokenImage(:token="item.token")

  template(#default)
    VList(p="l-2" flex-grow="1" justify="center")
      TitleWithIcon(icon="half-circle" fill="$mc-accent" font="bold" color="$mc-accent") {{ item.token.tokenInfo?.tier }}
      div(align="left" v-if="item.description") {{item.description}}

      TitleWithIcon(icon="cut-corner" fill="$corporation-text-color" state="active") STATUS: {{ status }}

  template(#rightSlot)
    VList(pr="4" v-if="!notOwned")
      ButtonAddRemove(@click="onClickToggle" :is-active="displayActive")

</template>

<script lang="ts" setup>
import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake';

const props = defineProps<{
  item: CorporationStakeItem,
}>()

const { isSameNFT } = useNFTs()

const { toggleStakeItem, getProposedItem, activeStakeItem } = useCorporationStake()
const { tokenOwnedState } = useMaybeStakedTokenState()
const tokenState = computed(() => tokenOwnedState(props.item.token))

const isSelected = computed(() => isSameNFT(props.item.token, activeStakeItem.value.token))

const thirtyDaysInSeconds = 2592000
const proposedItem = computed(() => getProposedItem(props.item))
const displayActive = computed(() => {
  const proposedState = proposedItem.value?.state
  if (!proposedState)
    return props.item.staked

  return proposedState == 'stake'
})
const isActive = ref((props.item.staked) ?? false)
const notOwned = computed(() => tokenState.value == 'not-owned')
// const ring = computed(() => ContractDistrictMap[props.item.tokenId])
const isUnstakable = computed(() => props.item.lockedAt + thirtyDaysInSeconds < Math.ceil(Date.now() / 1000))

const onClickToggle = () => {
  if (isUnstakable.value)
    toggleStakeItem(props.item)
}

const status = computed(() => {
  if (tokenState.value == 'not-owned')
    return "NOT OWNED"

  const isDirty = props.item.staked != isActive.value

  if (tokenState.value == 'pending')
    return 'PENDING'

  if (isActive.value) {
    return isDirty ? 'CONFIRM TO STAKE' : 'STAKED'
  } else {
    return isDirty ? 'CONFIRM TO UNSTAKE' : 'UNSTAKED'
  }
})

const onClick = () => activeStakeItem.value = props.item

// watch(isActive, (activeState) => {
//   const originalValue = !!props.item.staked

//   if (activeState == originalValue)
//     return activeItem.value.state = undefined

//   activeItem.value.state = activeState ? 'stake' : 'unstake'
// }, { immediate: true })

</script>
