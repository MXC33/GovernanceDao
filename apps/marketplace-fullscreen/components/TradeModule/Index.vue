<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center")
    slot(name="header")

    span(color="white" px="6") You own: {{ ownerValue }}

  VList(px="6" py="8" space-y="2")
    span(color="gray-200") Total Price
    HList(items="end" space-x="3")
      span(color="white" font="bold" text="4xl") 280 IXT
      span(color="white" font="bold" text="lg") $280

  HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    InputCheckbox(v-model="isSelected")
      span(color="gray-200") Max price per listing
  
</template>
<script lang="ts" setup>
defineProps<{
  ownerValue?: string | number
}>()

const isSelected = ref(false)


</script>