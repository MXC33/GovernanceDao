<template lang="pug">
Popup()
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p() Subscription deactivated successfully!
      VList()
        p() Winners will be drawn in:
        //HelperCountDown(:endTimestamp="lotteryEndsAt" v-if="lotteryEndsAt")
        HelperCountDown(:endTimestamp="1698760800000")

  template(#footer)
    ButtonItem(:value="'pink'" :text="'CLOSE'" @click="onClose()")

</template>
<script lang="ts" setup>

const { popup, closeActivePopup } = usePopups()
const { subscriptionEntries } = useSubscription()
const onClose = (() => {
  closeActivePopup()
})

import { useLottery } from "~/composables/useLottery";
const { lotteryEndsAt } = useLottery()

onUnmounted(() => {
  subscriptionEntries.value.value = 1
})
</script>
