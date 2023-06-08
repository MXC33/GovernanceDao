<template lang="pug">
Transition(name="fade" mode="out-in" )
  Table(:columns="columns" :rows="items" :id="'activity'" :loading="loading" )
    template(#item-event="{row}")
      HList(space-x="3")
        //- Minted(v-if="row.event=='mint'" w="5")
        Cart(v-if="row.event=='buy'" w="5")
        Purchase(v-else-if="row.event=='sell'" w="5")
        TransferIcon(v-else-if="row.event=='transfer'" w="5")
        TransferIcon(v-else-if="row.event=='burn'" w="5")

        div() {{ capitalizeFirstLetter(row.event) }}

    template(#item-timestamp="{row}")
      div() {{ displayedTime(row.timestamp) }}

    template(#item-nft.name="{row}")
      TableCellToken(:token="row.nft" @click="onClickItem(row.nft)" max-w="60")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { ActivityData } from '~/composables/api/get/useActivityAPI';
import type { TableColumn } from '~/composables/useTable'

// import Minted from '~/assets/icons/minted.svg'
import Cart from '~/assets/icons/cart.svg'
import TransferIcon from '~/assets/icons/transfer-activity.svg'
import Purchase from '~/assets/icons/notification/purchase.svg'


const { getTokenKey } = useTokens()
const { currentTime } = useGlobalTimestamp()

const { items, columns } = defineProps<{
  items: ActivityData[],
  columns: TableColumn<ActivityData>[],
  loading?: boolean
}>()

const onClickItem = (row: IXToken) => {
  const { network, collection, token_id } = row
  navigateTo(`/assets/${network}/${collection}/${token_id}`)
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const displayedTime = (timestamp: number) => {
  const { months, days } = useIntervalWithDays(timestamp, currentTime.value)

  const optMonth = months && months > 0 ? `${months} Months and` : ''
  return `${optMonth} ${days} Days ago`
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