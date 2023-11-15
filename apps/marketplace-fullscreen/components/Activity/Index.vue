<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 t-4 b-4 md:(8 b-30)" space-y="0 md:6")
  CollectionHeader(context="activity")
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
const { t } = useI18n()


const defaultColumns: TableColumn<ActivityData>[] = [

  {
    label: t('marketplace.myAssets.event'), rowKey: "event", getValue(row) {
      return row.event
    }, type: 'text', sortable: true
  },
  {
    label: t('marketplace.myAssets.asset'), rowKey: "nft.name"
  },
  {
    label: t('marketplace.myAssets.price'), rowKey: "price", type: 'text', sortable: true
  },
  {
    label: t('marketplace.myAssets.quantity'), rowKey: "quantity", type: 'text', sortable: true
  },
  {
    label: t('marketplace.myAssets.from'), rowKey: "from", type: 'contractAdress'
  },
  {
    label: t('marketplace.myAssets.to'), rowKey: "to", type: 'contractAdress'
  },
  {
    label: t('marketplace.myAssets.time'), rowKey: "timestamp", type: 'date', sortable: true
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
