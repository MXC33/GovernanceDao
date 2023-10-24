<template lang="pug">
Card()
  template(#default)
    HList(items="center" space-x="6")
      VList(w="18" items="center" flex-shrink="0")
        img(:src="`/assets/staking/${id}.png`" h="18" w="auto")

      VList()
        div(text="2xl" font="bold") {{ $t(`index.assetStaking.${id}.title`) }}

        div(text="gray-300") {{ $t(`index.assetStaking.${id}.description`) }}

  template(#detailRight v-if="!isMobile")
    HomepageAssetNavigation(:id="id" :data="data")

  template(#detailBottom v-else)
    HomepageAssetNavigation(:id="id" :data="data")

</template>

<script lang="ts" setup>

import type { StakingDataFragment } from '~/.nuxt/gql/default';
const { isMobile } = useDevice()
defineProps<{
  id: string,
  data: StakingDataFragment | null
}>()

</script>
