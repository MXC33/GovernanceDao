<template lang="pug">
ListItem(:is-selected="isSelected" :is-active="isPlacingLand", :token="item" pos="relative" :no-select="!isEditable" @click="onClick")
  template(v-slot:detail)
    BuildPower(:type="item.tokenInfo.type" :tier="item.tokenInfo.tier")

  template(v-slot:default)
    div(text="xs" space-y="0.5")
      div(text-shadow="white" text="sm") {{ item.tokenInfo.tier }} {{ item.tokenInfo.type }}
      //- div(color="mc-orange") {{ powerMultiplier }}X {{$t(`general.nrgProd`)}}
      HList(items="center" space-x="1")
        p(color="white opacity-80") {{ $t(`overview.id`) }} {{ title }}
        InfoIcon(w="5" h="5" transition="fill" fill="white opacity-60 hover:opacity-100" translate-y="-1px" @click="onClickInfoIcon" )

      ListItemActivity(:is-active="isStaked" @remove-item="$emit('removeItem')" :can-edit="isEditable")
</template>

<script lang="ts" setup>
import InfoIcon from '~~/assets/images/ui/info-icon.svg'
import type { NftFragment } from '#gql';

const { item, isSelected, isPlaceable } = defineProps<{
  item: NftFragment,
  isSelected?: boolean,
  isPlaceable?: boolean
}>()

defineEmits(["removeItem"])

const { isLandStakedOnTiles } = useTiles()
const { selectNFTLandToStake, isNFTLandActive } = useStakeNFTFlow()

const title = computed(() => (item as NftFragment)?.tokenInfo.title ?? item?.tokenId?.toString())

const isStaked = computed(() => isLandStakedOnTiles(title.value ?? item.tokenId))

const isEditable = computed(() => isPlaceable == false && isStaked.value)

const isPlacingLand = computed(() => isPlaceable && isNFTLandActive(title.value))

const onClick = () => {
  if (isStaked.value)
    return

  selectNFTLandToStake(item as NftFragment)
}

const onClickInfoIcon = () => {
  window.open((item as NftFragment)?.tokenInfo.inspectorLink)
}


</script>