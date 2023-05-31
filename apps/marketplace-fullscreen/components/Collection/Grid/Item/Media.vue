<template lang="pug">
VList(aspect="square" w="full" pos="relative" overflow="hidden")
  slot(name="media" @click="onClickItem")
    TokenLazyVideo(:token="token" :key="token.collection + token.token_id" :is-hovered="isHovered")


  HList(pos="absolute" inset="0" p="3")
    slot(name="icon-left")
      PolygonIcon(w="10" pos="absolute left-0 top-0")

  //- HList(pos="absolute" inset="0" p="3" pointer-events="none" opacity="0 group-hover:100" transition="all")

  //-   div(flex-grow="1")

  //-   //- CollectionGridButtonSelect(pointer-events="auto" @click="onSelectedItem")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import PolygonIcon from '~/assets/icons/polygon_filled.svg'

const mediaElement = ref()
const isHovered = useElementHover(mediaElement)
const { selectItem } = useSelection()

const props = defineProps<{
  token: IXToken
}>()

const onSelectedItem = () => {
  selectItem(props.token)
}

const onClickItem = () => {
  const { token_id, network, collection } = props.token

  if (token_id)
    navigateTo(`/assets/${network}/${collection}/${token_id}`)
}


</script>