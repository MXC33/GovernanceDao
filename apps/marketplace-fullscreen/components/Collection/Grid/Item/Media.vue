<template lang="pug">
VList(aspect="square" w="full" pos="relative" overflow="hidden") 

  NuxtLink(:to="getItemLink(token)"  rel="noopener" )
    slot(name="media")
      TokenLazyVideo(:token="token" :key="token.collection + token.token_id" :is-hovered="isHovered")

  HList(pos="absolute" inset="0" p="3" pointer-events="none")
    slot(name="icon-left")
      PolygonIcon(w="10" pos="absolute left-3 top-3")


  HList(pos="absolute" inset="0" p="3" pointer-events="none" opacity="on-selected:100 group-hover:100 0" transition="all" :selected="isSelected")
    CollectionGridButtonSelect(pointer-events="auto" @click.stop.prevent="onSelectedItem" pos="absolute right-3 top-3" v-model="isSelected")
    

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import PolygonIcon from '~/assets/icons/polygon_filled.svg'
const { selectItem, removeSelectedItem } = useSelection()

const isSelected = shallowRef(false)

const props = defineProps<{
  token: IXToken,
  isHovered?: boolean
}>()

const getItemLink = (token: IXToken) => {
  const { network, collection, token_id } = token
  return `/assets/${network}/${collection}/${token_id}`
}

const onSelectedItem = () => {
  isSelected.value = !isSelected.value
  if (isSelected.value)
    return selectItem(props.token)
  return removeSelectedItem(props.token)
}

</script>