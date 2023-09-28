<template lang="pug">
ListItemOutline(:is-selected="isSelected" :token="item" :menu="true")

  template(#iconLeft)
    TokenImage(:token="item")

  template(v-slot:default)
    div(text="sm" uppercase="~")
      TitleWithIcon(icon="pointer" :fill="facilityColor")
        TokenName(:token="item" font="bold" :key="getNftTokenKey(item, '-', true)" :color="facilityColor")
      HList(items="center" space-x="1")
        div(color="gray_light" text="xs") {{ $t(`general.energyProdCycle`)}}
        div(color="mc-mint" text="sm") {{ energyOutputCycle }}
      HList(items="center" space-x="1")
        div(color="gray_light" text="xs") {{ $t(`general.owned`) }}
        div(color="mc-mint" text="sm") {{item.balance }}

  template(#rightSlot)
    HList(b="1 gray-400 on-selected:!mc-mint_80 group-hover:mc-mint_80" rounded="full" w="6" h="6" mr="4" items="center" justify="center" :selected="isSelected")
      div(color="gray-400 on-selected:!mc-mint_80 group-hover:mc-mint_80" translate-y="2.25%" text="lg" :selected="isSelected") +

</template>


<script lang="ts" setup>
import type { NftFragment } from '#gql';
import { FacilityOutputCycle } from '~~/composables/NFTs/useFacility';

defineEmits(["removeItem"])

const energyOutputCycle = computed(() =>
  (FacilityOutputCycle[item.tokenInfo.tier]['A'] + 'h')
)

const { getNftTokenKey } = useNFTs()


const { item, isActive, isNftActive, isSelected } = defineProps<{
  item: NftFragment,
  isActive?: boolean,
  isNftActive?: boolean,
  isSelected?: boolean
}>()

const facilityColor = computed(() => {
  switch (item.tokenInfo.tier) {
    case 'legendary':
      return 'tier-gold'
    case 'rare':
      return 'tier-purple'
    case 'uncommon':
      return 'tier-blue'
    case 'common':
      return 'tier-green'
    case 'outlier':
      return 'tier-white'
  }
})

</script>

<style>
.roundPlus {
  stroke: var(--gray_light)
}

.roundPlus circle {
  stroke: var(--gray_light)
}
</style>