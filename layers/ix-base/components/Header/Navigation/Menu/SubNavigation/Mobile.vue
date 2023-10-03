<template lang="pug">
VList(text="gray-300" p="x-6 y-2") 
  div() {{ navigation.title }}
  div(b="b-1 gray-300" w="95%")

  div(grid="~ cols-2")
    HeaderNavigationMenuSubNavigationItem(:item="subItem" v-for="subItem in navigation.item") 

</template>

<script lang="ts" setup>
import type { HeaderMenuSubNavigation } from '~/composables/useSiteHeader';

const { navigation } = defineProps<{
  navigation: HeaderMenuSubNavigation
}>()
</script>