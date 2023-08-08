
<template lang="pug">

HList(:context="context" justify="center" items="center" space-x="3" pos="sticky left-0" pl="4" bg="gray-900" z="2" shadow="on-scrolled:right" :scrolled="scrolling" transition="all")
  InputCheckbox(:model-value="isItemSelected(token)" @update:modelValue="() => toggleItem(token)" v-if="!column.disableSelect" )

  TableCellToken(:token="token" max-w="full" :context="context")
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

</script>
