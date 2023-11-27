<template lang="pug">
VList(aspect="square" w="full" pos="relative" overflow="hidden" group) 

  NuxtLink(:to="getItemLink(token)" rel="noopener")
    slot(name="media")
      TokenImage(:token="token" :key="token.collection + token.token_id + 'rover'" :skip-thumbnail="true" v-if="isRover")
      TokenLazyVideo(:token="token" :key="token.collection + token.token_id" :is-hovered="isHovered" v-else)

  HList(pos="absolute" inset="0" p="3" pointer-events="none")
    slot(name="icon-left")
      PolygonIcon(w="10" pos="absolute left-3 top-3")


  HList(pos="absolute" inset="0" pointer-events="none" opacity="on-selected:100 group-hover:100 0 on-mobile:100" transition="all" :selected="isItemSelected(token)" :mobile="isMobile")
    CollectionGridButtonSelect(pointer-events="auto" pos="absolute right-3 top-3" :model-value="isItemSelected(token)" @update:modelValue="() => toggleItem(token)")
    

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import PolygonIcon from '~/assets/icons/polygon_filled.svg'

const { isItemSelected, toggleItem } = useSelection()

const isSelected = shallowRef(false)

const { isMobile } = useDevice()

const { token } = defineProps<{
  token: IXToken,
  isHovered?: boolean
}>()

const getItemLink = (token: IXToken) => {
  const { network, collection, token_id } = token
  return `/assets/${network}/${collection}/${token_id}`
}

const isRover = computed(() =>
  token?.collection?.toLowerCase() == roverAddress.polygon?.toLowerCase()
)

</script>