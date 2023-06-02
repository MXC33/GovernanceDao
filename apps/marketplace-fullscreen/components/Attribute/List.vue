<template lang="pug">
HList(py="0 md:t-6" space-x="md:2" flex-wrap="none lt-md:~ ")
  template(v-for="attribute in attributes" )

    AttributeItem(v-if="attribute.value != undefined")
      template(#header) {{ $t(`collection.attributes.${attribute.key}`) }}

      template(#icon v-if="attribute.hasToken")
        IXT(w="3 md:5")

      template(#default) {{ attribute.value }}
</template>

<script lang="ts" setup generic="K extends object">
import IXT from '~/assets/icons/token/ixt.svg'
import type { Attribute } from '~/composables/useAttributes';

defineProps<{
  attributes: Attribute<K>[],
}>()
</script>