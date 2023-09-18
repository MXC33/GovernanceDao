<template lang="pug">
InfoBlockItemValueText(v-if="textBlock" :item="textBlock" :token="token")
InfoBlockItemValueBalance(v-else-if="item.valueType == 'tokenBalance'" :item="item" :token="token")
InfoBlockItemValueTimeLeft(v-else-if="item.valueType == 'timeLeft'" :item="item" :token="token")

</template>

<script lang="ts" setup>
import type { InfoBlockItem, InfoBlockItemText } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  item: InfoBlockItem,
  token: NftFragment
}>()

const textBlock = computed(() => {
  if (!props.item.valueType)
    return props.item as InfoBlockItemText
  return null
})

</script>