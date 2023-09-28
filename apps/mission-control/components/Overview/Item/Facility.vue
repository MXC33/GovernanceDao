<template lang="pug">
ListItem(:is-selected="isSelected" :token="item")
  template(v-slot:detail)
    div(text="2.5 white") LVL.{{ item.tokenInfo.level }}

  template(v-slot:default)
    div(text="xs" space-y="1")
      div(text-shadow="white" text="sm") {{ item.tokenInfo.tier }} {{ item.tokenInfo.type }}
      div(color="mc-orange") {{$t(`general.nrgProd`)}} {{ energyOutputCycle }}

      ListItemActivity(:is-active="isNftActive" @remove-item="$emit('removeItem')" :can-edit="isNftActive")
</template>


<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { TileGroup } from '~/composables/useTiles';
import { FacilityOutputCycle } from '~~/composables/NFTs/useFacility';

defineEmits(["removeItem"])

const energyOutputCycle = computed(() =>
  FacilityOutputCycle[item.tokenInfo.tier][tileGroup.ring] + 'h'
)

const { tileGroup, item, isActive, isNftActive, isSelected } = defineProps<{
  tileGroup: TileGroup,
  item: NftFragment,
  isActive?: boolean,
  isNftActive?: boolean,
  isSelected?: boolean
}>()

</script>