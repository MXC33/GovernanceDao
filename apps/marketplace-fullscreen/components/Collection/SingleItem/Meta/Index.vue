<template lang="pug">
VList(space-y="6")
  TokenMedia(:token="item" w="full" frame="~" :is-large="true")

  ContentDrawer(:start-open="true" v-if="item.description")
    template(#titleicon)
      TitleWithIcon(icon="description") description
    template(#default) 
      div(p="3 t-0") {{ item.description }}

  ContentDrawer(:start-open="true")
    template(#titleicon)
      TitleWithIcon(icon="traits") traits
    template(#default) 
      div(grid="~ cols-3 gap-3" pb="3")
        AttributeTrait(v-for="trait in item.attributes")
          template(#category) {{ trait.trait_type }}
          template(#name) {{ trait.value }}

  ContentDrawer(:start-open="true")
    template(#titleicon)
      TitleWithIcon(icon="details") details

    template(#default) 
      CollectionSingleItemMetaDetails(:item="item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>