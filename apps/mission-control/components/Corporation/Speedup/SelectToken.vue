<template lang="pug">
HList(pos="relative" bg="on-active:(mc-mint_20 hover:mc-mint_20) mc-black_20 hover:mc-mint_20" cursor="pointer" :active="isActive" transition="all")
  HList(:mint="isActive" pos="relative" bg="on-mint:mc-mint_60" color="white" justify="center" w="full")
    TokenName(:token="token" font="bold" p="2" text="center")
    
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';

defineProps<{
  isActive: boolean,
  token: NftFragment
}>()
</script>

<style>
.selected-type.is-mint {
  background-color: var(--mc-black_20);
  color: var(--mc-white);
}

.selected-type {
  background-color: var(--mc-mint-20);
  color: var(--mc-white);
}
</style>