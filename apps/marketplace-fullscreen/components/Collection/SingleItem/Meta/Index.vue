<template lang="pug">
VList(space-y="6")
  CollectionSingleItemHeader(:item="item" display="md:none")

  VList(frame="~")
    VList(aspect="square" w="full" min-h="0" bg="#000")
      TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
    HelperMediaBar(@transfer="onClickTransfer")

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

const { displayPopup } = usePopups()
const isMobile = onMobile()
const onClickTransfer = () => {
  displayPopup({
    type: 'transfer-item',
    item
  })
}

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>