<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40" ref="mediaElement" cursor="pointer" group)
  VList(aspect="square" w="full" pos="relative" overflow="hidden")
    slot(name="media")
      TokenLazyVideo(:token="token" :key="getTokenKey(token)" :is-hovered="isHovered")

    HList(pos="absolute" inset="0" p="3" pointer-events="none" opacity="0 group-hover:100" transition="all")
      slot(name="icon-left")

      div(flex-grow="1")

      ListButtonSelect(pointer-events="auto")

  VList(w="full" flex-grow="1" items="start" bg="gray-900" :invalid="isInvalid" p="6" pos="relative")
    header(font="bold" w="full")
      slot(name="title")
        TokenName(:token="token" text="xl ellipsis")

      div(text="lg" ) 
        slot(name="subtitle") 0.12Eth

    div(flex-grow="1")

    div(text="md gray-200")
      slot(name="detail") Last sale: 0,0869 ETH 

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/../../layers/ix-base/composables/Token/useTokens'

const { getTokenKey } = useTokens()
const mediaElement = ref()
const isHovered = useElementHover(mediaElement)

defineProps<{
  token: TokenIdentifier,
  quantity?: number,
  isInvalid?: boolean,
  isActive?: boolean,
}>()

</script>