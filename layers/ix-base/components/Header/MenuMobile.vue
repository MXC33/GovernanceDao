<template lang="pug">
VList(pos="fixed top-16 left-0 right-0 bottom-0" bg="black" overflow-y="auto" m="!l-0")
  HeaderCategoryDropDownAccount(@swap="Swap" w="full")
  HeaderCategoryDropDownGrid()
  HeaderButtonDisconnect(pos="sticky bottom-0" z="1")

</template>

<script lang="ts" setup>
const emit = defineEmits(['swap', 'connectWallet', 'close'])

const Swap = () => {
  console.log("index Swap");
  emit('swap')
}

</script>