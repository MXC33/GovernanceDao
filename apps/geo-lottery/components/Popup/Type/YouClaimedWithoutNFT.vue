<template lang="pug">
Popup(:hideCloseButton="true")
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p() You claimed your reward ({{popup.prize.toFixed(3)}} AGOLD) successfully!

  template(#footer)
    ButtonItem(:value="'pink'" :text="'CLOSE'" @click="onClose()")

</template>
<script lang="ts" setup>

const { popup, closeActivePopup } = usePopups()
const onClose = (() => {
  closeActivePopup()
})

</script>
