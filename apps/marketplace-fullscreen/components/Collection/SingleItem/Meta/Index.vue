<template lang="pug">
VList(gap="6" pt="lt-lg:6")
  VList(frame="~")
    VList(aspect="square" w="full" min-h="0" bg="#000")
      TokenMedia(:token="item" w="full" :is-large="true" pos="relative" :contain="true")
    HelperMediaBar(@transfer="onClickTransfer")

  CollectionSingleItemMetaList(:item="item" display="lt-lg:none")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { displayPopup } = usePopups()

const onClickTransfer = () => {
  displayPopup({
    type: 'transfer-item',
    items: [item]
  })
}

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>