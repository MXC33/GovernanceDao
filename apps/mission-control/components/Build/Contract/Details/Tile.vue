<template lang="pug">
InfoSummaryRow(:bordered="true" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" bg="on-dirty:(white opacity-10) hover:(white opacity-10) on-active:(mc-mint opacity-20 hover:opacity-40 on-dirty:opacity-40) on-no-cash:(mc-red opacity-20)" pointer-events="on-free:none" text="sm" transition="all" cursor="default" :active="isActive" :dirty="isDirty" @click="isActive = !isActive" :no-cash="noCash" :free="isFree")
  template(#left) 
    HList(opacity="on-active:100 50 on-hover:80" transition="opacity" :active="isActive" :hover="isHovered" space-x="2") 
      div {{tileGroup.tileName}} 

      TokenIcon(:token="payToken" w="4" v-if="payToken && !hasGenesisNFT")

      span(font="on-clean:bold" text="on-active:mc-mint on-dirty:white on-no-cash:mc-red" :active="isActive" :clean="!isDirty" :dirty="isDirty" :no-cash="noCash") {{ copy }}

  template(#right)
    HelperCheckbox(type="checkbox" v-model="isActive" :is-error="noCash")
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'
import type { TileGroup } from '~~/composables/useTiles';
const { balanceOfToken } = useUserData()
const { getTokenFromAddress } = useTileRent()
const { setPixPendingActive } = useGameInterface()
const { isRented } = useTiles()
const { tokenOwnedState } = useMaybeStakedTokenState()

const isHovered = ref(false)
const props = defineProps<{
  index: number,
  tileGroup: TileGroup,
  isFree?: boolean
}>()
const isActive = defineModel<boolean>()

const genesisNFT: NftFragment = { tokenInfo: { type: 'genesis', tier: 'new-lands' } }
const hasGenesisNFT = computed(() => tokenOwnedState(genesisNFT) == 'staked')
const payToken = computed(() => getTokenFromAddress(props.tileGroup.rentalToken))
const noCash = computed(() =>
  !props.isFree && !hasGenesisNFT.value && balanceOfToken(payToken.value) <= 0 && !isDirty.value && isActive.value)

const isDirty = computed(() => isActive.value != isRented(props.tileGroup))

watch(isActive, () => {
  setPixPendingActive(props.tileGroup, isDirty.value)
})

onBeforeUnmount(() => {
  setPixPendingActive(props.tileGroup, false)
})

const copy = computed(() => {
  const originalState = isRented(props.tileGroup)
  if (noCash.value)
    return "NO FUNDS"
  if (isActive.value)
    return originalState == true ? 'ACTIVE' : 'CONFIRM TO ACTIVATE'
  else
    return originalState == false ? 'INACTIVE' : 'CONFIRM TO DEACTIVATE'
})

const onMouseEnter = () => {
  isHovered.value = true
  // selectedTile.value = props.tileGroup.tile
}

const onMouseLeave = () => {
  isHovered.value = false
  // selectedTile.value = null
}

</script>
