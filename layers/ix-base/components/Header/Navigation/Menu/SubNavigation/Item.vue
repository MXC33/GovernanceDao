<template lang="pug">
NuxtLink(:to="item.absolute_url" cursor="pointer" @click="onClick")
  HList(group p="3" space-x="3" pos="right-0" text="left")
    //-Display this image/svg when in Landscape mode
    HeaderNavigationMenuSubNavigationIcon(w="8" fill="white group-hover:ix-orange" flex-shrink="0" :item="item.icon" display="lt-lg:none")
    div()
      VList(v-if="item.absolute_url || isSwap")
        div(color="white group-hover:ix-orange" uppercase ="~") {{ item.name}} 
        div(color="gray-200 group-hover:ix-orange" text="sm" ) {{ item.description}} 
      VList(v-else)
        div(color="gray" uppercase="~") {{ item.name}} 
        div(color="ix-orange" text="sm" ) {{ $t(`general.navigation.soon`)}}
</template>
  
<script lang="ts" setup>
import type { HeaderMenuSubNavigationItem } from '~/composables/useSiteHeader'

const { enable: enableSwap } = useIXTSwapVisible()

const { item } = defineProps<{
  item: HeaderMenuSubNavigationItem
}>()

const isSwap = computed(() =>
  item.modal_type?.toLowerCase() == 'swap'
)

const onClick = () => {
  if (isSwap.value)
    enableSwap()
}

</script>