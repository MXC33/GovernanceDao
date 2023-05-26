<template lang="pug">
p(@click="clickList") click to list
CollectionSingleItem(:item="singleItem" v-if="singleItem")
</template>


<script lang="ts" setup>
import {get1155Contract, getIXTokenContract} from "~/composables/useAssetContracts";
import {IXTAddress} from "@ix/base/composables/Contract/WalletAddresses";
import {useListing} from "~/composables/useListing";
import type {SingleItemData} from "@ix/base/composables/Token/useIXToken";

const route = useRoute()
const { network, tokenId, contract } = route.params

const { data: singleItem, execute: fetchToken } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

await fetchToken()

const clickList = async () => {
  const listing = useListing()
  console.log('fisky Listing', await listing.list(toRaw(singleItem.value as SingleItemData), 10, 2, 1685019917))
}

onMounted(async () => {
  /*const IXTokenContract = get1155Contract(toRaw(singleItem.value)?.collection as string)
  console.log('fisky approveNftCheck', await IXTokenContract.approveNftCheck())*/



})

</script>
