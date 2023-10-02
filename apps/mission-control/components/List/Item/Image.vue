<template lang="pug">
ListItemImageWrapper(:is-selected="isSelected", :is-active="isActive", :has-detail="!!$slots.detail")

  div(flex="~ row" justify="center" items="center" bg="mc-orange_20 on-active:mc-mint_20" p="x-2" ring="1 on-active:mc-mint mc-orange" transition="all" text="lg" rounded="tr-lg bl-lg" self="end" :active="isSelected" v-if="$slots.detail" mb="2" )

    slot(name="detail")

  IconTier(:tier="token.tier" pos="absolute left--1 top--1px" w="2" h="[calc(100%+2px)]")

  TokenImage(:token="token" w="auto" min-w="20" h="full" min-h="0") 
  
</template>


<script setup lang="ts">
import type { NftFragment } from '#gql'

defineProps<{
  token: NftFragment
  isSelected?: boolean
  isActive?: boolean
}>()



</script>