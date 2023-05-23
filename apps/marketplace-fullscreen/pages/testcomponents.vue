<template lang="pug">
VList(items="center" justify="center" bg="gray-900" flex-grow="1" pos="relative")

  VList(items="start")
    CollectionFilterToggleFilter(@click="showFilters")
  //- Above generic wrapper - testing components under
  InputRow(v-model="isSelected" @click="toggle")
    template(#default)
      InputCheckbox(v-model="isSelected")
        template(#default) test

</template>

<script lang="ts" setup>
const isSelected = ref(false)
const toggle = () => isSelected.value = !isSelected.value

const toggler = ref(false)
const showFilters = () => {
  toggler.value = !toggler.value
}
</script>