<template lang="pug">
VList(flex-grow="1" space-y="6")
  template(v-for="block in item.infoBlocks" v-if="item.infoBlocks")
    InfoBlock(:block="block" :token="item.token")

</template>
    
<script lang="ts" setup>
import type { TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';

const { item, isSelected } = defineProps<{
  item: TokenWithInfoBlocks
  isSelected?: boolean
}>()

</script>