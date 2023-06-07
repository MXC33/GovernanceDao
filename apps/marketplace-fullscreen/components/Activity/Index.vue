<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 t-4 b-4 md:(8 b-30)" space-y="0 md:6")
  CollectionHeader() 
    template(#header) 
      slot(name="name") hej

    //- template(#cert v-if="data?.list.name != null")
    //-   ClientOnly
    //-     CertifiedIcon(w="6")

  slot(name="menu")

  HList(space-x="0 on-open:3" pos="relative")

    //- ActivityList(v-if="data" :columns="defaultColumns" :items="data.list" :hide-grid="true", :context="context" :show-filters="false" :loading="loading")

  slot(name="bottom")


</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import type { ActivityDataList } from '~/composables/api/get/useActivityAPI';

const { activeFilters } = useCollectionSettings()


const defaultColumns: TableColumn<IXToken>[] = [

  {
    label: "Event", rowKey: "event", type: 'text'
  },
  {
    label: "Asset", rowKey: "nft[0].name"
  },
  {
    label: "Quantity", rowKey: "nft[0].quantity", type: 'text'
  },
]



const { data, columns, context = 'collection' } = defineProps<{
  data?: ActivityDataList,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext,
  loading?: boolean
}>()



onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>