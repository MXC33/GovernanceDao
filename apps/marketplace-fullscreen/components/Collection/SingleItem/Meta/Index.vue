<template lang="pug">
VList(space-y="6")
  VList(frame="~")
    TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
    HelperMediaBar(@transfer="openCloseTransfer")

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

Teleport(to="body")
  //- Transfer(:token="item" v-if="popupModal" @close="openCloseTransfer")
  PopupNew(v-if="popupModal")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

// const transferVisible = useTransferVisible()  
const { popupModal } = usePopups()

const openCloseTransfer = () => {
  popupModal.value = !popupModal.value
}

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>