<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" context="my-assets" :loading="pending" @load-next-page="loadNextPage")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

const { myAssetsURL } = useCollectionsURL()
const { t } = useI18n()

const decodeHtmlCharCodes = (str) => {
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}
useHead({
  title: decodeHtmlCharCodes(t('marketplace.pages.account.meta_title'))
})

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 0,
  }
})

await fetchCollection()
setupCollectionListeners()

const columns: TableColumn<IXToken>[] = [
  { label: t('marketplace.pages.account.asset'), type: 'asset', width: 200 },
  { label: t('marketplace.pages.account.currentPrice'), rowKey: "sale_price", type: 'ixt', sortable: true, align: 'end' },
  { label: t('marketplace.pages.account.usdPrice'), rowKey: "sale_price", type: 'usd', sortable: true, hideMobile: true },
  { label: t('marketplace.pages.account.bestOffer'), rowKey: "higher_bid_price", type: 'ixt', sortable: true, hideMobile: true },
]

</script>
