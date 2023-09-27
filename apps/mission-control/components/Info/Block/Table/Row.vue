<template lang="pug">
template(v-if="!item.oneColumn")
  InfoBlockTableRowBlock(:item="item" grid="col-span-1 md:col-span-2") {{ item.name }}
  InfoBlockTableRowBlock(:item="item" :is-value="true" align="right" grid="col-span-1 md:col-span-1") 
    InfoBlockItemValue(:item="item", :token="token")

template(v-else)
  InfoBlockTableRowBlock(:item="item" grid="col-span-3" flex="~" space-x="1"  :is-value="true")
    div() {{ item.name }}
    InfoBlockItemValue(:item="item" :is-value="true" p="0" bg="transparent" :token="token")
    
</template>

<script lang="ts" setup>
import type { InfoBlockItem } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const { item, token } = defineProps<{
  item: InfoBlockItem,
  token: NftFragment,
}>()

</script>