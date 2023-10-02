<template lang="pug">
PopupBase(@close="onClose")
  template(#header) Swap IXT
  template(#default) 
    VList(w="md:135" h="md:120" bg="mc-gray" items="center" justify="center" display="lt-md:none")
      iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:115")

    VList(w="full" justify="center" items="center" display="md:none")
      iframe(src="https://ix.foundation/lefi" w="full" h="100")



</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])

const onClose = () => {
  emit("close")
}

</script>

<style>
.lifi svg path {
  stroke: var(--mc-gray);
  background-color: var(--mc-gray);
}
</style>