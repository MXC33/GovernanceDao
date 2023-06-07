<template lang="pug">
VList(aspect="square" w="full" pos="relative" overflow="hidden" @click="onClickItem") 
  slot(name="media")
    TokenLazyVideo(:token="token" :key="token.collection + token.token_id" :is-hovered="isHovered")


  HList(pos="absolute" inset="0" p="3")
    slot(name="icon-left")
      PolygonIcon(w="10" pos="absolute left-3 top-3")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import PolygonIcon from '~/assets/icons/polygon_filled.svg'

const props = defineProps<{
  token: IXToken,
  isHovered?: boolean
}>()

const onClickItem = () => {
  const { token_id, network, collection } = props.token

  if (token_id != null)
    navigateTo(`/assets/${network}/${collection}/${token_id}`)
}


</script>