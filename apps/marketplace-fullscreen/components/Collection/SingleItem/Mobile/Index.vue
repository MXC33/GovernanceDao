<template lang="pug">
VList(space-y="4")

  VList(pt="2" space-y="2")
    VList(w="full" space-y="1")
      CollectionSingleItemSubHeader()
        template(#default)
          TokenCollection(:token="item" color="ix-ne")
      span(text="lg" font="bold") {{ item.name }}

    AttributeList(:attributes="attributes" v-if="item")

  VList(frame="~" mt="2")
    VList(aspect="square" w="full" min-h="0")
      TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
    HelperMediaBar(@transfer="onClickTransfer")

  TradeModule(:item="item") 

  CollectionSingleItemMobileMeta(:item="item")



//- Listing(:item="item")

</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

// const { tabs, activeTab } = useTabList(['sell', 'buy'])

const { getSingleAttributes } = useDefaulAttributes()
const { addToCart } = useCart()
const attributes = computed(() => getSingleAttributes(item))

const saleColumns: TableColumn<Sale>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },
  { label: "Expiration", rowKey: "endtime", sortable: true },
  { label: "Seller", rowKey: "player_id", sortable: true },
  { label: "Action", rowKey: "action", width: 80 }
]

const addSaleToCart = (sale: Sale) => {
  addToCart(item, sale)
}

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },

]
const { item } = defineProps<{
  item: SingleItemData
}>()

const { displayPopup } = usePopups()

const onClickTransfer = () => {
  displayPopup({
    type: 'transfer-item',
    item
  })
}

</script>