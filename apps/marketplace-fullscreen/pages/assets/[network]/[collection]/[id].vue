<template lang="pug">
div not implemented
  List(:IXToken="IXToken")
//- Collection(:items="rows")
//-   CollectionItemCollapsable(class="basis-1 md:basis-2/3" :title="'Listings'")
//-     template(#icon)
//-       Plus

</template>


<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import Plus from '~/assets/icons/plus.svg'

const IXToken = {
  "_index": "meta_shares",
  "collection": "0xba6666b118f8303f990f3519df07e160227cce87",
  "network": "polygon",
  "token_id": 7,
  "type": 0,
  "nft_type": 0,
  "reference": null,
  "image": "https://nft-cdn.alchemy.com/matic-mainnet/a52863cebd45f7b3471ebe9045f15d2c",
  "thumbnail": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/a52863cebd45f7b3471ebe9045f15d2c",
  "icon": "https://alchemy.mypinata.cloud/ipfs/QmYQ5Nw7n49YN2CFe9S1NUXDsgfqAuiDiHm3nxYewhVYT5/7.png",
  "video": "https://alchemy.mypinata.cloud/ipfs/QmcP6t4ZnAmy6sRXALdRQfsNaQoXn7xbLpUsL2UWoBHfnm/7.mp4",
  "name": "Waste",
  "slug": null,
  "attributes": [
    {
      "value": "Global Waste Systems®",
      "trait_type": "Corporation"
    },
    {
      "value": "Filthy",
      "trait_type": "Status"
    },
    {
      "value": "Black",
      "trait_type": "Color"
    },
    {
      "value": "1",
      "trait_type": "Unit"
    },
    {
      "value": "Bag",
      "trait_type": "Type"
    },
    {
      "value": "Kevlar",
      "trait_type": "Material"
    }
  ],
  "sale_price": 0.0065,
  "higher_bid_price": 0.0053,
  "parent": {
    "id": "1",
    "name": "Resources",
    "slug": "resources",
    "parent_id": null
  },
  "my_shares": 14
} as IXToken


const { allTokens, fetchUserInventory } = useUserData()
await fetchUserInventory()

// const rows = computed<IXToken[]>(() =>
//   allTokens.value.map((token) => token as IXToken)
// )


</script>