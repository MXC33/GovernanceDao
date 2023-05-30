<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList()
      VList()
        HList(text="lg" font="bold" justify="between")
          span() Your Balance
          span(v-if="ixt") {{ ixtBalanceRounded }} IXT
          span(v-else) ... IXT
        HList(justify="end" color="gray-200")
          span(mb="4") $

      ContentDrawer(frame="none" mb="4" b="t-1 b-1 gray-600" :is-neutral="true")
        template(#header) APPLY TO ALL
        template(#default)
          ListingApplyAll()
            template(#header) Floor price
            template(#button) Set to Floor

      ListingItem(v-for="(_, index) in listItems" v-model="listItems[index]")

  template(#footer)
    VList()
      HList(w="full" justify="between")
        div(color="gray-200") Total Price
        GlitchText(:text="totalPrice" suffix=" IXT")

      HList(w="full" justify="between")
        div(color="gray-200") Marketplace fee
        p 2.5%

      HList(w="full" justify="between" text="lg right" font="bold" items="end")
        p() Total potential earnings
        GlitchText(:text="totalPotentialEarning" suffix=" IXT")


  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="List Items" :invalid="!!invalidPrice" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

defineEmits(['close'])

const { createListItems, listItems, totalIXTPrice } = useListingItems()
const { listItem } = useListingContract()

const invalidPrice = computed(() => {
  if (!totalIXTPrice.value)
    return '--'
})

const totalPrice = computed(() => String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value, 4)))

const totalPotentialEarning = computed(() =>
  String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value * (1 - 0.025), 4))
)

// const { ixtToUSD, ixtAsUSD } = useIXTPrice()
const { ixtBalance } = getIXTokenContract()
const { displayPopup } = usePopups()
const { data: ixt, refresh: fetchIXT } = ixtBalance()
fetchIXT()

const ixtBalanceRounded = computed(() => roundToDecimals(ixt.value ?? 0, 2))

const isLoading = ref(false)
const onClickList = async () => {
  isLoading.value = true
  const list = await listItem(listItems.value[0])
  isLoading.value = false
  console.log('List result', list)

  displayPopup({
    type: 'listing-successful',
    items: listItems.value
  })
}

const { items } = defineProps<{
  items: SingleItemData[],
}>()

createListItems(items, 1)

</script>