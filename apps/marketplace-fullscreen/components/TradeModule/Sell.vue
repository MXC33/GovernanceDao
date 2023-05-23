<template lang="pug">
VList()
  VList(px="6" py="8" space-y="2")
    span(color="gray-200") Total Price

    HList(items="end" space-x="3")
      span(color="white" font="bold" text="4xl") 280 IXT
      span(color="gray-200" font="bold" text="lg") $280

  HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    InputCheckbox(v-model="maxPrice")
      span(color="gray-200") Max price per listing

  div(grid="~ cols-2" text="base")
    button(btn="~ secondary") Make offer
    button(btn="~ primary") Sell 1 item

</template>

<script lang="ts" setup>

defineProps<{
  ownerValue?: string | number
}>()

const maxPrice = ref(false)
</script>