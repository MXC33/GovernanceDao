<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 t-4 b-4 md:(8 b-30)" space-y="0 md:6")
  CollectionHeader() 
    template(#header) 
      slot(name="name") {{ $t(`marketplace.myAssets.title`) }}

  slot(name="menu")

  HList(space-x="0 on-open:3" pos="relative")

    ActivityList(v-if="data" :columns="defaultColumns" :items="data.list", :loading="loading")

  slot(name="bottom")


</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import type { ActivityDataList, ActivityData } from '~/composables/api/get/useActivityAPI';


const defaultColumns: TableColumn<ActivityData>[] = [

  {
    label: "Event", rowKey: "event", getValue(row) {
      return row.event
    }, type: 'text', sortable: true
  },

  {
    label: "Asset", rowKey: "nft.name"
  },
  {
    label: "Price", rowKey: "price", type: 'text', sortable: true
  },
  {
    label: "Quantity", rowKey: "quantity", type: 'text', sortable: true
  },
  {
    label: "From", rowKey: "from", type: 'contractAdress'
  },
  {
    label: "To", rowKey: "to", type: 'contractAdress'
  },
  {
    label: "Time", rowKey: "timestamp", type: 'date', sortable: true
  },
]



const { data } = defineProps<{
  data?: ActivityDataList,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext,
  loading?: boolean
}>()



</script>