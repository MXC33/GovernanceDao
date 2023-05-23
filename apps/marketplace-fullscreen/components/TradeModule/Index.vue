<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center" b="b-1 gray-600")
    Tab()
      TabItem(v-for="(tab, tabIndex) in tabs" v-model="isTabSelected[tabIndex]") {{ tab }}

    span(color="white" px="6") You own: {{ ownerValue }}

  VList(px="6" py="8" space-y="2")
    span(color="gray-200") Total Price
    HList(items="end" space-x="3")
      span(color="white" font="bold" text="4xl") 280 IXT
      span(color="white" font="bold" text="lg") $280

  HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    InputCheckbox(v-model="isSelected")
      span(color="gray-200") Max price per listing

  div(grid="~ cols-2" text="base")
    button(bg="gray-600" py="3" font="bold" uppercase="~") hej
    button(bg="ix-primary" py="3" font="bold" uppercase="~") buy

</template>

<script lang="ts" setup>
defineProps<{
  ownerValue?: string | number
}>()

type Tabs = 'sell' | 'buy'
const tabs: Tabs[] = ['sell', 'buy']

const isSelected = ref(false)
const isTabSelected = ref<Tabs[]>([])


</script>