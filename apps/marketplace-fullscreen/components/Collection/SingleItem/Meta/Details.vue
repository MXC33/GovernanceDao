<template lang="pug">
VList()
  AttributeRow()
    template(#name) Contract adress
    template(#value) 
      ContractAdress(color="ix-primary" :adress="item.collection")

  AttributeRow()
    template(#name) Token Id
    template(#value) {{ item.token_id}}

  AttributeRow()
    template(#name) Token standard
    template(#value v-if="is721") ERC-721
    template(#value v-else-if="is1155") ERC-1155

  AttributeRow()
    template(#name) Chain
    template(#value) {{ network }}

  //- SAVE FOR FUTURE USE
  //- AttributeRow()
  //-   template(#name) Last updated
  //-   template(#value) TODO

  AttributeRow()
    template(#name) Marketplace Fee
    template(#value) 5%
    
</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const route = useRoute()
const { network } = route.params




const { item } = defineProps<{
  item: SingleItemData
}>()

const is721 = ERC721Addresses.includes(item.collection)
const is1155 = ERC1155Addresses.includes(item.collection)

</script>