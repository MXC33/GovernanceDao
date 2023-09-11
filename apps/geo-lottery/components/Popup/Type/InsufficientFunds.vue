<template lang="pug">
Popup()
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Error

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6" )
      VList()

        div(bg="black opacity-60" p="3" )
          div(color="semantic-warning" max-h="34" overflow-y="auto") Insufficient Funds!

  template(#footer)
    ButtonItem(:value="'red'" min-w="300px md:350px"  :text="'CLOSE'")

</template>
<script lang="ts" setup>
const { closeActivePopup } = usePopups()

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
