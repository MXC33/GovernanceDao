<template lang="pug">
ListItemOutline(:accented="true" :is-large="true" text="normal" :item="item.token" @click="activeRenameItem = item" :is-selected="isSelected")

  template(#iconLeft)
    TokenImage(:token="item.token" :key="getNftTokenKey(item.token)")

  template(#default)
    VList(p="l-2" justify="start")

      TitleWithIcon(icon="half-circle" fill="$mc-accent" color="$mc-accent" font="bold") {{ item.token.tokenInfo.tier }}
      HList(space-x="2")
        div(color="mc-white") {{ item.token.tokenInfo?.title }}
        STAR(w="3" fill="mc-white" translate-y="-7%" v-if="isCustom")

      TitleWithIcon(icon="cut-corner" fill="mc-success on-custom:mc-white" :custom="isCustom" color="mc-success on-custom:mc-white") {{ isCustom ? 'CUSTOMIZED' : 'DEFAULT'}}

</template>

<script lang="ts" setup>
import STAR from '~~/assets/images/ui/icons/custom-star.svg'
import type { TokenWithInfoBlocks } from '~/composables/useInfoBlocks';

const { getNftTokenKey } = useNFTs()

const { item } = defineProps<{
  isSelected?: boolean
  item: TokenWithInfoBlocks
}>()
const { activeRenameItem } = useCorporationRename()

const isCustom = computed(() => !isDefaultRoverName(item.token.tokenInfo.title))

</script>
