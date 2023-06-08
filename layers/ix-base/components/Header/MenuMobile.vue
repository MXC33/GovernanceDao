<template lang="pug">
VList(pos="fixed top-16 left-0 right-0 bottom-0" bg="black" overflow-y="auto" m="!l-0")
  HeaderCategoryDropDownAccount(@swap="$emit('swap')" w="full")
  HeaderCategoryDropDownGrid()
  HeaderButtonDisconnect(pos="sticky bottom-0" z="1")

</template>

<script lang="ts" setup>
defineEmits(['swap'])
</script>