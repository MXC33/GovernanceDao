<template lang="pug">
CollectionSingleItem(:item="singleItem" v-if="singleItem")

</template>


<script lang="ts" setup>
import {getIXTokenContract} from "~/composables/useAssetContracts";
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
  const IXTokenContract = getIXTokenContract()
  const allowace  = await IXTokenContract.allowanceCheck(0.2)
  console.log('fisky allowace', allowace)

})

</script>
