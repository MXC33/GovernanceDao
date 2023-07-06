<template lang="pug">
VList(frame="~")
  ContentDrawer(:start-open="!isMobile" v-if="item.description" :is-neutral="true" bg="gray-900" :no-frame="true")
    template(#titleicon)
      TitleWithIcon(icon="description") {{ $t(`marketplace.singleItem.description`) }}
    template(#default) 
      div(p="6 b-4 t-0") {{ item.description }}

  ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900" :no-frame="true" :is-meta="true")
    template(#titleicon)
      TitleWithIcon(icon="traits") {{ $t(`marketplace.singleItem.traits`) }}
    template(#default) 
      div(grid="~ cols-3 gap-3" p="6 b-4 t-0")
        AttributeTrait(v-for="trait in item.attributes")
          template(#category) {{ trait.trait_type }}
          template(#name) {{ trait.value }}

  ContentDrawer(:start-open="!isMobile" :is-neutral="true" :no-frame="true" :is-meta="true")
    template(#titleicon)
      TitleWithIcon(icon="details") {{ $t(`marketplace.singleItem.details`) }}

    template(#default) 
      CollectionSingleItemMetaDetails(:item="item" :is-neutral="true" bg="gray-900" px="2")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { isMobile } = useDevice()

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>