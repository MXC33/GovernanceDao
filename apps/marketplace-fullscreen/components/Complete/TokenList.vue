<template lang="pug">
VList(min-h="30" frame="~")
  VList(aspect="square" min-h="0" w="full")
    TokenSlideshow(:tokens="mappedTokens" v-if="mappedTokens.length > 1")
    TokenMedia(v-else-if="mappedTokens.length == 1" :token="mappedTokens[0]" fill="cover")

  VList()
    HList(justify="between" v-for="item in items" font="bold" p="3")
      TokenName(:token="item.token")
      div x{{ item.shares.value }}
</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions';

const mappedTokens = computed(() => items.map((item) => item.token))

const { items } = defineProps<{
  items: TransactionItem[]
}>()
</script>

<style></style>