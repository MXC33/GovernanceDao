<template lang="pug">
VList(bg="gray-800" frame="~" flex-shrink="0")
  HList(justify="start" cursor="pointer" p="l-3 r-6" items="center" @click="$emit('clickItem')")
    VList(w="30" h="30" pos="relative" min-h="0")
      TokenImage(:token="item.token")

    VList(w="full" p="y-6 x-3")
      HList(space-x="3" font="bold")
        TokenName(:token="item.token" w="auto")
        span x{{ item.shares.value }}

      slot(name="description")

    slot(name="icons")

  slot(name="collapsable")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const { item } = defineProps<{
  item: TransactionItem
}>()
defineEmits(["clickItem"])
</script>
  