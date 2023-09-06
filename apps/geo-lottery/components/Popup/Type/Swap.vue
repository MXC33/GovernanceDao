<template lang="pug">
Popup()
  template(#content)
    VList(flex-grow="1" p="4" space-y="4" text="md" font="normal")
      SwapToken()

  template(#footer)
    Button(:value="'pink'" w="full" mt="5") Swap

</template>
<script lang="ts" setup>
const { closeActivePopup } = usePopups()

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
