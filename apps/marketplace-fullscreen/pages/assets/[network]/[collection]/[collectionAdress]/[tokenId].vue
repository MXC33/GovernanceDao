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
  const IXTokenContract = getIXTokenContract('0x50964c7b9aD5eF312a756790b28a9FB48D6410c1')
  const allowace  = (await IXTokenContract.allowance())
  console.log('fisky allowace', allowace)
  if (allowace === 0) {
    const approve = await IXTokenContract.approve('1000000000000000000')
    console.log('fisky approve', approve)
  }
})

</script>