<template lang="pug">
ListItem(:is-selected="isSelected" :is-active="isPlacingLand", :token="item" pos="relative" :no-select="!isEditable" @click="onClick")
  template(v-slot:detail)
    BuildPower(:type="item.tokenInfo.type" :tier="item.tokenInfo.tier")

  template(v-slot:default)
    div(text="xs" space-y="0.5")
      div(text-shadow="white" text="sm") {{ item.tokenInfo.tier }} {{ item.tokenInfo.type }}
      //- div(color="mc-orange") {{ powerMultiplier }}X {{$t(`general.nrgProd`)}}
      p(color="white opacity-80") id: {{ title }}

      ListItemActivity(:is-active="isStaked" @remove-item="$emit('removeItem')" :can-edit="isEditable")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';

defineEmits(["removeItem"])

const { isLandStakedOnTiles } = useTiles()
const { selectNFTLandToStake, isNFTLandActive } = useStakeNFTFlow()

const title = computed(() => (item as NftFragment)?.tokenInfo.title ?? null)

const isStaked = computed(() => isLandStakedOnTiles(title.value ?? item.tokenId.toString()))

const isEditable = computed(() => isPlaceable == false && isStaked.value)

const isPlacingLand = computed(() => isPlaceable && isNFTLandActive(title.value))

const onClick = () => {
  if (isStaked.value)
    return

  selectNFTLandToStake(item as NftFragment)
}
const { item, isSelected, isPlaceable } = defineProps<{
  item: NftFragment,
  isSelected?: boolean,
  isPlaceable?: boolean
}>()

</script>