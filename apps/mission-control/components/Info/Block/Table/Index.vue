<template lang="pug">
div(grid="~ cols-2 md:cols-3 gap-1" uppercase="~" w="full")
  template(v-for="item in block.items")
    InfoBlockTableRow(:item="item" :token="token")
</template>

<script lang="ts" setup>
import type { InfoBlockTable } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const { block, token } = defineProps<{
  block: InfoBlockTable,
  token: NftFragment,
}>()

</script>