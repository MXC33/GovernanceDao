<template lang="pug">
ListItemOutline(:accented="true" :is-large="true" text="normal" :item="item" :is-selected="isSelected || noSelect" cursor="on-no-select:default" :no-select="noSelect" pos="relative")
  template(#iconLeft)
    TokenImage(:token="item" :object="imgContainOrCover")

  template(#default)
    VList(p="l-4")
      TitleWithIcon(icon="half-circle" fill="$mc-accent" font="bold" color="$mc-accent")
        TokenName(:token="item")

      slot

  template(#rightSlot v-if="noSelect")

  template(#afterItem v-if="$slots.afterItem")
    slot(name="afterItem")

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';

const { item, noSelect, imgObject, isSelected } = defineProps<{
  item: NftFragment,
  isSelected?: boolean,
  noSelect?: boolean,
  imgObject?: string,
}>()

const imgContainOrCover = computed(() => {
  switch (imgObject) {
    case 'cover':
      return 'cover center'
    case 'contain':
      return 'contain center'
  }
})

</script>
