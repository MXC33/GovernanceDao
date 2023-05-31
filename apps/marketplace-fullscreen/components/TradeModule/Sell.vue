<template lang="pug">
VList()
  VList(px="6" py="8" space-y="2")
    span(color="gray-200") Total Price

    HList(items="end" space-x="3")
      span(color="white" font="bold" text="4xl") {{ item.sale_price }} IXT
      span(color="gray-200" font="bold" text="lg") ${{ ixtToUSD(item.sale_price) }}

  //- SAVE BELOW FOR FUTURE NEED
  //- HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
  //- InputCheckbox(v-model="maxPrice")
  //-   span(color="gray-200") Max price per listing

  div(grid="~ cols-2" text="base")
    button(btn="~ secondary" font="bold") Accept offer
    ButtonInteractive(btn="~ primary" font="bold" @click="onClickSell" text="List item")


</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { ixtToUSD } = useIXTPrice()


const { displayPopup } = usePopups()
const onClickSell = () => {
  displayPopup({
    type: 'list-item',
    items: [item]
  })
}

const { item } = defineProps<{
  item: IXToken
}>()

</script>