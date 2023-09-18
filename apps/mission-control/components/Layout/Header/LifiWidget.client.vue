<template lang="pug">
PopupWrapper()

  VList(w="md:135" h="md:120" bg="mc-gray" items="center" justify="center" display="lt-md:none")
    iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:115")

  VList(w="full" justify="center" items="center" display="md:none")
    iframe(src="https://ix.foundation/lefi" w="100%" h="100")


  //- VList(items="end" w="130")
  //-   button(@cancel="$emit('cancel')" btn="~ accent" mt="4" cut="bottom-right md") {{$t(`general.cancel`)}}

</template>

<script lang="ts" setup>
// defineEmits(['cancel'])

</script>

<style>
.lifi svg path {
  stroke: var(--mc-gray);
  background-color: var(--mc-gray);
}
</style>