<template lang="pug">
PopupWrapper()
  Popup(:title="$t(`offers.starterPack.title`)" bg="black" sender="proxy-of-change" @cancel="activePopup = null" @confirm="clickPurchase" :confirm-text="$t(`offers.buttons.confirm`)")
    template(v-slot:default) 
      HelperWriter(:lines="$t(`offers.starterPack.description`)")

    template(v-slot:images)
      OfferCart(:confirmText="$t(`offers.starterPack.description`)")


</template>
<script lang="ts" setup>
const activePopup = usePopups()


const clickPurchase = () => {
  activePopup.value = 'payments'
}

</script>