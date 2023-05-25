<template lang="pug">
CollectionSingleItem(:item="singleItem" v-if="singleItem")

</template>


<script lang="ts" setup>
import {get1155Contract, getIXTokenContract} from "~/composables/useAssetContracts";
import {IXTAddress} from "@ix/base/composables/Contract/WalletAddresses";

const route = useRoute()
const { collection, network, tokenId, collectionAdress } = route.params

const { data: singleItem, execute: fetchToken } = await useAssetAPI({
  slug: String(collection),
  adress: String(collectionAdress),
  network: String(network),
  tokenId: String(tokenId)
})

await fetchToken()

onMounted(async () => {
  const IXTokenContract = get1155Contract(toRaw(singleItem.value)?.collection as string)
  console.log('fisky approveNftCheck', await IXTokenContract.approveNftCheck())

})

</script>
