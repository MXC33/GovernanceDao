<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.unlist.title`) }}

  template(#default)
    VList(space-y="3")
      TransactionItemCancel(:token="item" v-for="item in items")
        template(#detail) x{{ item.sale.quantity }}

    div(p="y-3" color="semantic-warning") {{ $t(`marketplace.unlist.warningText`) }}

  template(#buttons)
    HList()
      button(btn="~ secondary" w="full" @click="cancelOnClick") {{ $t(`marketplace.unlist.cancel`) }}
      ButtonInteractive(btn="~ primary" w="full" @click.prevent="unlistOnClick" text="Unlist" :loading="isLoading") 

</template>

<script lang="ts" setup>
import ListingIcon from '~/assets/icons/listing.svg'
import type { UnlistingItem } from "~/composables/useListing";

const { closeActivePopup, displayPopup } = usePopups()
const { removeList } = useListEndpoints()

const { myAssetsURL } = useCollectionsURL()

const { loading: isLoading, execute: removeListRequest } = useContractRequest(async () => {
  const requests = items.map((item) =>
    removeList(item, item.sale)
  )

  await Promise.all(requests)

  return Promise.all([refreshSingleItem(), refreshMyAssets()])
})

const route = useRoute()
const { network, tokenId, contract } = route.params

const { items } = defineProps<{
  items: UnlistingItem[],
}>()

const { refresh: refreshSingleItem } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

const { refresh: refreshMyAssets } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 3,
  }
})

const unlistOnClick = async () => {
  const didUnlist = await removeListRequest()
  if (didUnlist)
    displayPopup({
      type: 'unlist-item-success',
      items
    })
}

const cancelOnClick = async () => {
  closeActivePopup()
}



</script>