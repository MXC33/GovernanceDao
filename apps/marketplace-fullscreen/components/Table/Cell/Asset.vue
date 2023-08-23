
<template lang="pug">
HList(min-w="0" pos="relative")

  HList(justify="center" items="center" space-x="6" z="2" min-w="0")

    InputCheckbox(:model-value="isItemSelected(token)" @update:modelValue="() => toggleItem(token)" v-if="!column.disableSelect" flex-shrink="0")

    TableCellToken(:token="token" max-w="full" @click="onClickAsset" min-w="0" :hide-name="scrolling")
      span(v-if="onAccountPage" color="gray-200" font="normal" text="xs md:sm" translate-y="") x{{ token.my_shares }}

  Transition(name="slide-right" mode="in-out")
    div(pos="absolute top--3 bottom--3 md:(top--2 bottom--2)" left="-8" bg="gray-900" w="31 md:40" v-if="scrolling")
      div(w="full" pos="absolute bottom-0" b="b-1 gray-600")
      div(w="2" pos="absolute left-full top-0 bottom-0" :class="tableScroll")


</template>

<script setup lang="ts">
import type { TableColumnAsset } from '~/composables/useTable'
import type { CollectionContext } from '~/composables/useCollection'
import type { IXToken } from '@ix/base/composables/Token/useIXToken'

const { isItemSelected, toggleItem } = useSelection()
const route = useRoute()

const { column, context, token, scrolling } = defineProps<{
  column: TableColumnAsset,
  token: IXToken,
  scrolling?: boolean,
  context?: CollectionContext
}>()

const onClickAsset = () => {
  const { network, collection, token_id } = token
  navigateTo(`/assets/${network}/${collection}/${token_id}`)
}

const tableScroll = computed(() => {
  if (scrolling)
    return 'tablegrader'
  return ''
})

const onAccountPage = computed(() => route.matched.some((match) => match.path === '/account'))

</script>

<style>
.tablegrader {
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 50%, rgba(168, 168, 168, 0) 100%)
}
</style>
