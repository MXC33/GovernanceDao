<template lang="pug">
HList(py="0 md:7" space-x="md:2" flex-wrap="none lt-md:~")
  template(v-for="attribute in supportedAttributes" )

    AttributeItem(v-if="data[attribute.key] != undefined")
      template(#header) {{ $t(`collection.attributes.${attribute.key}`) }}

      template(#icon v-if="attribute.hasToken")
        IXT(w="3 md:6" h="3 md:6")

      template(#default) {{ data[attribute.key] }}
</template>

<script lang="ts" setup>
import IXT from '~/assets/icons/token/ixt.svg'
import type { CollectionData } from "~/composables/useCollection";

const props = defineProps<{
  data: CollectionData
}>()



interface AttributeProperty {
  key: keyof CollectionData,
  hasToken?: boolean
}

const supportedAttributes: AttributeProperty[] = [
  {
    key: 'total_volume',
    hasToken: true
  },
  {
    key: 'sale_price',
    hasToken: true
  },
  { key: 'listed' },
  { key: 'unique_owners' },
  { key: 'owners' },
  { key: 'floor_price' }
]

console.log("ATTR", props.data, supportedAttributes)
</script>