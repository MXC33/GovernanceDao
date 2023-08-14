<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.unbid.title`) }}

  template(#default)
    VList(space-y="3")
      TransactionItemCancel(:token="item" v-for="item in items")
        template(#detail) x{{ item.bid.quantity }}

    div(p="y-3" v-if="items.length > 1") {{ $t(`marketplace.unbid.warningTextMultiple`) }}
    div(p="y-3" v-else="items.length") {{ $t(`marketplace.unbid.warningText`) }}


  template(#buttons)
    HList()
      button(btn="~ secondary" w="full" @click="cancelOnClick") {{ $t(`marketplace.unbid.cancel`) }}
      ButtonInteractive(btn="~ primary" w="full" @click.prevent="unbidOnClick" :text="`${selectedItems}`" :loading="isLoading") 

</template>

<script lang="ts" setup>
import ListingIcon from '~/assets/icons/listing.svg'
import type { UnbidItem } from '~/composables/useBidding';

const { closeActivePopup, displayPopup } = usePopups()
const { removeBid } = useBidsAPI()

const { myAssetsURL } = useCollectionsURL()
const { loading: isLoading, execute: removeBidRequest } = useContractRequest(async () => {
  await Promise.all(items.map((item) => removeBid(item)))
  return Promise.all([refreshSingleItem(), refreshMyAssets()])
})

const route = useRoute()
const { network, tokenId, contract } = route.params

const { items } = defineProps<{
  items: UnbidItem[],
}>()

const selectedItems = computed(() => {
  if (items.length > 1)
    return 'Remove Bids'
  return 'Remove Bid'
})

const { refresh: refreshSingleItem } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

const { refresh: refreshMyAssets } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 2,
  }
})

const unbidOnClick = async () => {
  const unbid = await removeBidRequest()

  if (unbid)
    displayPopup({
      type: 'unbid-success',
      items
    })
}

const cancelOnClick = async () => {
  closeActivePopup()
}



</script>