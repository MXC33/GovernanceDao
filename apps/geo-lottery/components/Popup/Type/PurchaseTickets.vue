<template lang="pug">
Popup()
  template(#header) Purchase Tickets

  template(#default)
    VList(space-Y="4" pos="relative")
      HList(space-x="3" pos="relative")
        p() Choose method
        HelperHover(tooltip-id="Choose method Info tooltip")
          InfoIcon(w="5")

      InputRadio(v-model="purchaseTypeModel" :value="'popup-type-one-time-entry'")
        template(#default) One-time entry
        template(#info) 0 entries out of 20
      InputRadio(v-model="purchaseTypeModel" :value="'popup-type-subscribe'")
        template(#default) Subscription
        template(#info) 0 entries out of 30


  template(#footer)
    VList()
      ButtonItem(:value="'pink'" :text="'CONTINUE'" @click="onContinue()")

</template>
<script lang="ts" setup>
import InfoIcon from '~/assets/icons/info.svg'
const { displayPopup, closeActivePopup } = usePopups()

const purchaseTypeModel = ref<'popup-type-one-time-entry' | 'popup-type-subscribe'>('popup-type-one-time-entry')

const onContinue = () => {
  displayPopup({
    type: purchaseTypeModel.value,
    backModal: 'popup-type-purchase-tickets'
  })
}

defineEmits(["close"])
</script>
