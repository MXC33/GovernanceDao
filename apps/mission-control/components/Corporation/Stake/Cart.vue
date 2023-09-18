<template lang="pug">
ClientOnly
  CorporationItemsAndDetail(:list-title="$t(`general.product`)" v-model="activeStakeItem" :list="items" detail-title="" :header="$t(`corporations.${corporationRouteI18n}.title`)")
    template(#noItems v-if="items.length == 0")
      HelperWarning(bg="black opacity-10") {{ $t(`general.no-items`) }}

    template(#list v-else)

      CorporationStakeListItem(:item="item" v-for="(item, index) in items")

    template(#afterList v-if="hasStakeItems")
      VList(mb="3")
        HelperTimeFrame(alignment="center" :class="[`${hazardType}`]" v-if="!isStaked") {{ $t(`general.stake-lock-thirty`) }}
        HelperTimeFrame(alignment="center" :class="[`${hazardType}`]" v-else-if="isStaked") {{ $t(`general.stake-lock-unstake`) }}


    template(#cartLeft v-if="hasStakeItems")
      VList(flex-grow="1")

        CorporationCartRow()
          VList(items="center" justify="center") 
            div(uppercase="~") {{ $t('general.nSelected', {n: proposedStakeItems.length}) }}
          ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="$emit('stake')") {{ $t('general.confirm') }}

</template>

<script lang="ts" setup>
import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake';

const { corporationRouteI18n } = useCorporationRoute()

const { proposedStakeItems, activeStakeItem, resetState } = useCorporationStake()

onUnmounted(() => resetState())

defineEmits(["stake"])

const hasStakeItems = computed(() => proposedStakeItems.value.length > 0)
const isStaked = computed(() => activeStakeItem.value.staked)

defineProps<{
  stakeType: string,
  items: CorporationStakeItem[]
}>()

const hazardType = computed(() => {
  switch (proposedStakeItems.value[0].token.tokenInfo?.tier) {
    case 'eternalab':
      return 'hazard is-light'
    default:
      return 'hazard'
  }
})

</script>