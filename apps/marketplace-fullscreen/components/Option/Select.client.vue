<template lang="pug">
VList()
  ButtonSquareIcon(display="md:none" @click="toggleTakeOver" w="10 on-lg:12" :lg="large")
    div(w="6" :lg="large")
      slot(name="icon")

  VList(display="lt-md:none")
    OptionDropDown(:items="items" v-if="items" :large="large")
      template(#selectedName) 
        slot(name="header")

      template(#beforeItems)
        slot(name="beforeItems")

      template(#item="{item}")
        slot(name="item" :item="item")

Teleport(to="#takeover")
  Transition(name="slide-bottom")
    OptionPanel(v-if="showTakeOver" @close="showTakeOver = false")
      template(#header) 
        slot(name="header")

      template(#beforeItems)
        slot(name="beforeItems")

      template(#default)
        slot(name="item" :item="item" v-for="item in items")

</template>

<script lang="ts" setup generic="T extends object | string">

const showTakeOver = ref(false)

const toggleTakeOver = () => {
  showTakeOver.value = !showTakeOver.value
}

defineProps<{
  items: T[],
  large?: boolean
}>()

</script>
