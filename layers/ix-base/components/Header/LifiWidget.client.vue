<template lang="pug">
PopupBase(@close="onClose")
  template(#header) Swap IXT
  template(#default)
    VList(w="md:135" h="md:132.5" bg="mc-gray" items="center" justify="center" display="lt-md:none")
      iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:132.5")

    VList(w="full" justify="center" items="center" display="md:none")
      iframe(src="https://ix.foundation/lefi" w="full" h="132.5")

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
