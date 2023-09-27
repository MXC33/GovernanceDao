<template lang="pug">
button(pos="relative" card="~ on-active:selected" flex="~ row" justify="start" items="center" p="2 md:4" w="full" :active="isActive" group)

  IconTier(:type="item.tokenInfo.type" :tier="item.tokenInfo.tier" pos="absolute left--1 top--1px" w="2" h="[calc(100%+2px)]")

  TokenImage(:token="item" max-w="12" translate-y="group-hover:-0.5" transition="all" max-h="12")

  div(text="left" flex="grow" ml="4")
    p(text="white" text-shadow="white" uppercase="~") {{ item.tokenInfo.tier }} {{ item.tokenInfo.type }}
    p(text="xs" color="white opacity-80") x{{ item.balance }} 

  ChevronRightIcon(w="4" h="4" justify-self="end")

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import ChevronRightIcon from '~/assets/images/ui/icon-chevron-right.svg'

const { item, isActive } = defineProps<{
  item: NftFragment,
  isActive?: boolean
}>()

</script>