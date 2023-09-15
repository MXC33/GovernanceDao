<template lang="pug">
Popup()
  template(#header) Manage Tickets

  template(#default)
    VList( pos="relative")
      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your one-time entries
        div(flex="~" ml="0")
          CirclePlusIcon(w="5" mr-3)
          p(font="bold" text="lg") 10 tickets
      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your subscription entries
        div(flex="~" ml="0")
          CirclePlusIcon(w="5" mr-3)
          p(font="bold" text="lg") 5 tickets
      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your one-time entries
        div(flex="~" ml="0" items-center)
          InputSwitch(v-model="switchModel")
          p(font="bold" text="lg" )
            template(v-if="switchModel & !switchModelUpdated") Active
            template(v-else-if="switchModel & switchModelUpdated") Activate - Press continue to comfirm
            template(v-else-if="!switchModel & !switchModelUpdated") Inactive
            template(v-else-if="!switchModel & switchModelUpdated") Deactivate - Press continue to comfirm
  template(#footer)
    VList()
      ButtonItem(:value="'pink'" :text="'CONTINUE'")

</template>
<script lang="ts" setup>
import CirclePlusIcon from '~/assets/icons/circle-plus.svg'

const { closeActivePopup } = usePopups()

// get subscription status and update those
const switchModel = ref(false)
const switchModelSaved = ref(false)

const switchModelUpdated = ref(false)

watch(switchModel, (val) => {
  console.log(val) // console log value when changed from InputSwitch component
  if(switchModelSaved.value != val)
    switchModelUpdated.value = true
  else
    switchModelUpdated.value = false
})

</script>
