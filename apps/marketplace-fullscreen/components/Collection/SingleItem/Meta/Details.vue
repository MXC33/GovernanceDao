<template lang="pug">
VList()
  AttributeRow()
    template(#name) Contract adress
    template(#value) 
      span(color="ix-primary") {{ item.collection}}

  AttributeRow()
    template(#name) Token Id
    template(#value) {{ item.token_id}}

  AttributeRow()
    template(#name) Token standard
    template(#value) TODO

  AttributeRow()
    template(#name) Chain
    template(#value) {{ network }}

  AttributeRow()
    template(#name) Last updated
    template(#value) TODO

  AttributeRow()
    template(#name) Marketplace Fee
    template(#value) TODO
    
</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const route = useRoute()
const { network } = route.params

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>