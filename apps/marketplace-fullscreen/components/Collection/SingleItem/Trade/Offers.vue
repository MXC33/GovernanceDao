<template lang="pug">
ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
  template(#titleicon)
    TitleWithIcon(icon="offer") offers
  template(#default)
    HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.my_shares == 0")
      span() You do not own this asset

    HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.bids.length < 1" )
      span() There is no offers for this item

    Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true" v-else="item.bids.length > 0")
      template(#item-buttons="{row}" )
        button(@click="onClickAcceptOffer(row)" uppercase="~" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3") Accept

</template>

<script lang="ts" setup>
import type { SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
const { displayPopup } = usePopups()

const { item } = defineProps<{
  item: SingleItemData
}>()

const onClickAcceptOffer = (bid: Bid) => {
  displayPopup({
    type: 'accept-item',
    item: {
      ...item,
      bid
    }
  })
}

const offerColumns = computed<TableColumn<Bid>[]>(() => {
  const baseColumns: TableColumn<Bid>[] = [
    { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
    { label: "USD Price", type: "usd", rowKey: "price", sortable: true },
    { label: "Quanitity", rowKey: "quantity", sortable: true },
    {
      label: "Floor Difference", rowKey: "price", getValue(row) {
        if (item.sale_price == 0)
          return 'No sale exist'

        const difference = roundToDecimals(
          ((row.price * 100) / item.sale_price) - 100
          , 2)
        return Math.abs(difference) + '% ' + (difference < 0 ? 'below' : 'above')
      }, sortable: true
    },
    { label: "Expiration", type: "date", rowKey: "due_date", sortable: true }

  ]
  if (item.my_shares > 0)
    baseColumns.push({ type: 'buttons', width: 120 })

  return baseColumns
})



</script>
