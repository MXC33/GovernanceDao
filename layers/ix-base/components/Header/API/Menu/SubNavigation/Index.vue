<template lang="pug">
div(text="gray-300" p="2") 
  div {{ navigation.title }}
  
  div(b="b-1 gray-300" w="95%")

  div(grid="~ cols-1 cols-2")
    HeaderAPIMenuSubNavigationItem(:item="subItem" v-for="subItem in navigation.item" ) 

</template>

<script lang="ts" setup>
import type { HeaderMenuSubNavigation } from '~/composables/useSiteHeader';

const {navigation} = defineProps<{
  navigation: HeaderMenuSubNavigation
}>()


</script>