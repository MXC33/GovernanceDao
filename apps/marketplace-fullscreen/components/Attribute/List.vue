<template lang="pug">
HList(py="0 md:7" space-x="md:2" flex-wrap="none lt-md:~")
  AttributeItem(v-for="data in itemData")
    template(#header) {{ data.header }}
    template(#icon v-if="data.isToken")
      IXT(w="3 md:6" h="3 md:6")
    template(#default) {{ data.value }}
</template>

<script lang="ts" setup>
import IXT from '~/assets/icons/token/ixt.svg'
import type {CollectionData} from "~/composables/useCollection";

const props = defineProps<{
    data: CollectionData
}>()

const itemData = []
if(props.data.total_volume)
  itemData.push({
      header: 'total volume',
      value: props.data.total_volume,
      isToken: true
  })

if(props.data.sale_price)
  itemData.push({
      header: 'best offer',
      value: props.data.sale_price,
      isToken: true
})

if(props.data.listed)
  itemData.push({
      header: 'listed',
      value: props.data.listed,
      isToken: false
})

if(props.data.unique_owners)
  itemData.push({
      header: 'unique owners',
      value: props.data.unique_owners,
      isToken: false
})

if(props.data.owners)
    itemData.push({
        header: 'owners',
        value: props.data.owners,
        isToken: false
    })

if(props.data.floor_price)
    itemData.push({
        header: 'floor price',
        value: props.data.floor_price,
        isToken: true
    })

</script>