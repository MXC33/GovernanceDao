<template lang="pug">
TransactionItemStatic(v-if="item" :item="item" @clickItem="isOpen = !isOpen")
  template(#description)
    TransactionItemDescription(:item="item" v-if="!isTransfer")

  template(#icons)
    HList(space-x="6")
      CheckMarkIcon(opacity="0 on-valid:100" transition="all" :valid="isValid" w="6")

      HelperChevron(w="5" :up="isOpen")

  template(#collapsable)
    Collapse(:when="isOpen" class="v-collapse")
      VList(p="6" w="full" space-y="3")
        TransactionItemDetails(:item="item" v-if="!isTransfer")

        div(b="t-1 gray-600")

        slot(name="adjustments")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
import CheckMarkIcon from '~/assets/icons/checkmark-green.svg'
import { Collapse } from 'vue-collapsed'

const { isTransfer = false, isMultiple } = defineProps<{
  isTransfer?: boolean,
  isMultiple?: boolean,
}>()


const item = defineModel<TransactionItem>()
const isOpen = shallowRef(!isMultiple)
// console.log("TX", item.value)

const isValid = computed(() => !!item.value?.ixtPrice && !!item.value.shares)
// console.log("Transaction", item, "isTransfer", isTransfer)
</script>
  