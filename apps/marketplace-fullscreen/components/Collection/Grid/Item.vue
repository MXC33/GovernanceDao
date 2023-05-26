<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40" ref="mediaElement" cursor="pointer" @click="onClickItem" group)
  VList(aspect="square" w="full" pos="relative" overflow="hidden")
    slot(name="media")
      TokenLazyVideo(:token="token" :key="token.collection + token.token_id" :is-hovered="isHovered")

    HList(pos="absolute" inset="0" p="3" pointer-events="none" opacity="0 group-hover:100" transition="all")
      slot(name="icon-left")

      div(flex-grow="1")

      CollectionGridButtonSelect(pointer-events="auto")

  VList(w="full" flex-grow="1" items="start" bg="gray-900" :invalid="isInvalid" p="6" pos="relative")
    header(font="bold" w="full")
      slot(name="title")
        TokenName(:token="token" text="xl ellipsis" capitalize="~")

      div(text="lg" ) 
        slot(name="subtitle") {{ token?.sale_price }} IXT

    div(flex-grow="1")

    div(text="md gray-200")
      slot(name="detail") Best offer: {{ token?.higher_bid_price }} IXT

    Transition(name="slide-bottom")
      button(btn="~ primary" pos="absolute bottom-0 left-0 right-0" v-if="isHovered" @click.stop="onClickCart") Add to cart
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const mediaElement = ref()
const route = useRoute()
const isHovered = useElementHover(mediaElement)
const { addToCart } = useCart()

const onClickCart = () => {
  addToCart(props.token)
}

const onClickItem = () => {
  const id = props.token.token_id
  const address = props.token.collection
  console.log(id, address, 'id and adress')
  if (id)
    navigateTo(route.path + `/${address}/${id}`)
}

const props = defineProps<{
  token: IXToken,
  quantity?: number,
  isInvalid?: boolean,
  isActive?: boolean,
  page?: string,
}>()

</script>