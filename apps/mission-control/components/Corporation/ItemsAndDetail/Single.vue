<template lang="pug">
ClientOnly()
  CorporationBorderBox(title="Details" cut="none md:top-right s-lg b-$mc-accent" v-if="item")
    CorporationItemWithInfoBlocks(:item="item" px="2" pt="lt-md:3" pb="lt-md:3")

    //- template(#afterScroll)
    template(#outsideScroll)
      CorporationCartWrapper()
        slot()

  CorporationBorderBox(title="Details" cut="none md:top-right s-lg b-white" v-else-if="!item")
    VList(color="$corporation-text-color" justify="center" items="center" flex-grow="1" uppercase="~") {{ $t(`general.not-available`) }}


</template>

<script lang="ts" setup>
import type { TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';

const { item } = defineProps<{
  item?: TokenWithInfoBlocks,
}>()

</script>