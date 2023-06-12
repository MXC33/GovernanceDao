<template lang="pug">
VList()
  AttributeRow()
    template(#name) {{ $t(`marketplace.singleItem.contractAdress`) }}
    template(#value) 
      NuxtLink(:to="linkAdress" :external="true" target="_blank" color="ix-primary") {{ showAdress(item.collection)}} 
      //-span(color="ix-primary") {{ item.collection}} 

  AttributeRow()
    template(#name) {{ $t(`marketplace.singleItem.tokenId`) }}
    template(#value) {{ item.token_id}}

  AttributeRow()
    template(#name) {{ $t(`marketplace.singleItem.tokenStandard`) }}
    template(#value v-if="is721") ERC-721
    template(#value v-else-if="is1155") ERC-1155

  AttributeRow()
    template(#name) {{ $t(`marketplace.singleItem.chain`) }}
    template(#value) {{ network }}

  //- SAVE FOR FUTURE USE
  //- AttributeRow()
  //-   template(#name) Last updated
  //-   template(#value) TODO

  AttributeRow()
    template(#name) {{ $t(`marketplace.price.marketplaceFee`) }}
    template(#value) 5%
    
</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const route = useRoute()
const { network } = route.params

const showAdress = (str: string) => {
  const firstFour = str.slice(0, 5);
  const lastFour = str.slice(-5);
  return `${firstFour}...${lastFour}`;
}

const { item } = defineProps<{
  item: SingleItemData
}>()

const is721 = ERC721Addresses.includes(item.collection)
const is1155 = ERC1155Addresses.includes(item.collection)

const linkAdress = computed(() => `https://polygonscan.com/address/${item.collection}`)

</script>