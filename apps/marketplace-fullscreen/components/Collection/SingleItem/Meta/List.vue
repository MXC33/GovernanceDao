<template lang="pug">
VList(gap="6")

  ContentDrawer(:start-open="!isMobile" v-if="item.description" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="description") description
    template(#default) 
      div(p="6 t-3") {{ item.description }}

  ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="traits") traits
    template(#default) 
      div(grid="~ cols-3 gap-3" p="6 t-3")
        AttributeTrait(v-for="trait in item.attributes")
          template(#category) {{ trait.trait_type }}
          template(#name) {{ trait.value }}

  ContentDrawer(:start-open="!isMobile" :is-neutral="true")
    template(#titleicon)
      TitleWithIcon(icon="details") details

    template(#default) 
      CollectionSingleItemMetaDetails(:item="item" :is-neutral="true" bg="gray-900")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const isMobile = onMobile()

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>