<template lang="pug">
Transition(name="fade" mode="out-in" )
  CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
    CollectionGridItem.collection-grid-item(:token="token" v-for="token in items" b="gray-400" :context="context")

  Table(v-else :columns="columns" :rows="items" :id="context")
    template(#item-name="{row}")
      HList(items="center" space-x="2" font="bold" @click="onClickItem(row)" cursor="pointer" max-w="60")
        div(w="12" h="12")
          TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
        TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")
        span(v-if="context == 'my-assets'" :key="(getTokenKey(row))" color="gray-200" font="normal") x{{ row.my_shares }}

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()

const { items, columns, context = 'collection' } = defineProps<{
  items: IXToken[],
  columns: TableColumn<IXToken>[],
  hideGrid?: boolean,
  showFilters: boolean,
  context?: CollectionContext
}>()

const onClickItem = (row: IXToken) => {
  const { network, collection, token_id } = row
  navigateTo(`/assets/${network}/${collection}/${token_id}`)
}

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}

@media only screen and (max-width: 540px) {
  .collection-grid-item:nth-child(odd) {
    border-right: 0.5px solid #636363 !important;
  }
}
</style>