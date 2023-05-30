<template lang="pug">
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

</template>

<script lang="ts" setup>
import type { ListingItem } from "~/composables/useListing";

const { getTotalIXTPrice } = useListingItems()

const totalPrice = computed(() => String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value, 4)))

const totalIXTPrice = computed(() => getTotalIXTPrice(items))

const totalPotentialEarning = computed(() =>
  String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value * (1 - 0.025), 4))
)

const invalidPrice = computed(() => {
  if (!totalIXTPrice.value)
    return '--'
})

const { items } = defineProps<{
  items: ListingItem[],
}>()


</script>