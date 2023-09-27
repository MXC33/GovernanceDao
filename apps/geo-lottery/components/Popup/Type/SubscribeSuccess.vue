<template lang="pug">
Popup(:hideCloseButton="true")
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      img(src="~/assets/images/LC-Territory-logot.png" width="226" m="t-9")

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p(v-if="popup.entries > 1") Subscription stream activated for ({{ popup.entries }}) tickets on a weekly basis.
        p(v-else) {{ popup.entries }} Subscription stream activated for ({{ popup.entries }}) ticket on a weekly basis.

  template(#footer)
    ButtonItem(:value="'pink'" :text="'CLOSE'" @click="onClose()")

</template>
<script lang="ts" setup>

const { popup, closeActivePopup } = usePopups()
const { subscriptionEntries } = useSubscription()
const onClose = (() => {
  closeActivePopup()
})

onUnmounted(() => {
  subscriptionEntries.value.value = 1
})
</script>
