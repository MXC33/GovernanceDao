<template lang="pug">
VList(space-y="6")
  VList(frame="~")
    VList(aspect="square" w="full" min-h="0")
      TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
    HelperMediaBar(@transfer="onClickTransfer")

  ContentDrawer(:start-open="true" v-if="item.description" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="description") description
    template(#default) 
      div(p="6 t-3") {{ item.description }}

  ContentDrawer(:start-open="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="traits") traits
    template(#default) 
      div(grid="~ cols-3 gap-3" p="6 t-3")
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

const { displayPopup } = usePopups()

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