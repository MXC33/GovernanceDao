<template lang="pug">
Transition(name="fade" mode="out-in" )
  Table(:columns="columns" :rows="items" :id="'activity'" :loading="loading" )
    template(#item-nft.name="{row}")
      HList(items="center" space-x="2" font="bold" @click="onClickItem(row.nft)" cursor="pointer" max-w="60")
        div(w="12" h="12")
          TokenImage(:token="row.nft" w="12" h="12" :key="getTokenKey(row.nft)")
        TokenName(:token="row.nft" capitalize="~" :key="getTokenKey(row.nft)")


</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { ActivityData } from '~/composables/api/get/useActivityAPI';
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()
const ghostRows = [1, 2, 3, 4, 5, 6, 7, 8]

const { items, columns } = defineProps<{
  items: ActivityData[],
  columns: TableColumn<ActivityData>[],
  loading?: boolean
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