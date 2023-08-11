
<template lang="pug">
HList(min-w="0" overflow="hidden")
  div(w="30 md:36" pos="absolute left--6 top--2 bottom--2" shadow="on-scrolled:right" :scrolled="scrolling" transition="all" bg="gray-900" b="b-1 gray-600")
    div()

  HList(justify="center" items="center" space-x="6" z="2" min-w="0")

    InputCheckbox(:model-value="isItemSelected(token)" @update:modelValue="() => toggleItem(token)" v-if="!column.disableSelect" flex-shrink="0")

    TableCellToken(:token="token" max-w="full" @click="onClickAsset" min-w="0" :hide-name="scrolling")
      span(v-if="context == 'my-assets'" color="gray-200" font="normal" text="lt-md:sm") x{{ token.my_shares }}

</template>

<script setup lang="ts">
import type { TableColumnAsset } from '~/composables/useTable';
import type { CollectionContext } from '~/composables/useCollection';
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
const { isItemSelected, toggleItem } = useSelection()


const { column, context, token } = defineProps<{
  column: TableColumnAsset,
  token: IXToken,
  scrolling?: boolean,
  context?: CollectionContext
}>()

const onClickAsset = () => {
  const { network, collection, token_id } = token
  navigateTo(`/assets/${network}/${collection}/${token_id}`)
}

</script>
