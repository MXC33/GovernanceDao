<template lang="pug">
VList(pos="fixed top-12" inset="0" bg="black" overflow-y="auto" m="!l-0" z="99")
  HeaderCategoryDropDownAccount(@close="$emit('close')")
  HeaderCategoryDropDownGrid()
  HeaderButtonDisconnect(pos="sticky bottom-0" z="1")

</template>

<script lang="ts" setup>
defineEmits(['close'])
</script>