<template lang="pug">
HList.no-scrollbar(space-x="2" whitespace="nowrap" overflow-x="scroll")
  template(v-for="attribute in attributes" )

    AttributeItem(v-if="attribute.value != undefined")
      template(#header) {{ $t(`collection.attributes.${attribute.key}`) }}

      template(#icon v-if="attribute.hasToken")
        IXT(w="3 md:5")

      template(#default v-if="Number(attribute.value) == 0") --
      template(#default v-else) {{ formatAmount(attribute.value) }}
</template>

<script lang="ts" setup generic="K extends object">
import IXT from '~/assets/icons/token/ixt.svg'
import type { Attribute } from '~/composables/useAttributes';
const { formatAmount } = useFormatNumber()


defineProps<{
  attributes: Attribute<K>[],
}>()

</script>