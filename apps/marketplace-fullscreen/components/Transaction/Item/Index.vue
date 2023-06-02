<template lang="pug">
VList(bg="gray-800" v-if="item" frame="~" flex-shrink="0")
  HList(justify="start" @click="isOpen = !isOpen" cursor="pointer" p="l-3 r-6" items="center")
    VList(w="30" h="30" pos="relative" min-h="0")
      TokenImage(:token="item.token")

    VList(w="full" p="y-6 x-3")
      HList(space-x="3" font="bold")
        TokenName(:token="item.token" w="auto")
        span x{{ item.shares.value }}

      TransactionItemDescription(:item="item")

    HList(space-x="6")
      CheckMarkIcon(opacity="0 on-valid:100" transition="all" :valid="isValid" w="6")

      HelperChevron(w="5" :up="isOpen")


  Collapse(:when="isOpen" class="v-collapse")
    VList(p="6" w="full" space-y="6")
      TransactionItemDetails(:item="item")

      div(b="t-1 gray-600")

      slot(name="adjustments")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
import CheckMarkIcon from '~/assets/icons/checkmark-green.svg'
import { Collapse } from 'vue-collapsed'

const item = defineModel<TransactionItem>()
const isOpen = ref(false)

const isValid = computed(() => !!item.value?.ixtPrice && !!item.value.shares)
console.log("Transaction", item)
</script>
  