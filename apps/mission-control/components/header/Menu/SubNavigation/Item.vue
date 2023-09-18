<template lang="pug">
NuxtLink(:to="item.absolute_url" cursor="pointer" @click="onClick")
  VList(p="3" space-y="2" group)
    VList(v-if="item.absolute_url || isSwap")
      div(color="white group-hover:ix-orange" uppercase ="~") {{ item.name }} 
      div(color="gray-200 group-hover:ix-orange" text="xs lg:sm") {{ item.description }}

    VList(v-else)
      div(color="gray" uppercase ="~") {{ item.name }} 
      div(color="ix-orange" text="xs lg:sm") {{ $t(`general.navigation.soon`)}}

</template>
  
<script lang="ts" setup>
import type { HeaderMenuSubNavigationItem } from '~/composables/useSiteHeader'

const { enable: enableSwap } = useIXTSwapVisible()

const { item} = defineProps<{
  item: HeaderMenuSubNavigationItem
}>()

const isSwap = computed(() => 
  item.modal_type?.toLowerCase() == 'swap'
)

const onClick = () => {
  if(isSwap.value)
    enableSwap()
}

</script>