<template lang="pug">
Popup()
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList()
        p() Subscription activated and 1 ticket added!
        p() Hope the luck be with you!
      VList()
        p() Winners will be drawn in:
        p(font="bold") 6 hours 43 minutes 16 seconds

  template(#footer)
    Button(:value="'pink'" w="full") CLOSE

</template>
<script lang="ts" setup>
const { closeActivePopup } = usePopups()

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
