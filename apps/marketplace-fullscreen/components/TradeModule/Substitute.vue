<template lang="pug">
div(grid="~ cols-1 md:cols-4" space-y="4 md:0" px="4 md:6" py="4 md:3" b="t-1 gray-600 md:(t-1 b-1 gray-600)" items="center")
  div(grid="col-span-1" w="full" whitespace="nowrap")
    InputCheckbox(v-model="isSubstitue")
      span(color="gray-200") 
        slot(name="title")

  div(flex="~ row" grid="col-span-1 md:col-start-4" color="white" align="lt-md:left" whitespace="nowrap" w="full" gap="1 md:3" v-if="isSubstitue")
    HList(flex-grow="1" justify="start md:between" w="full")
      slot(name="substituteInput")

</template>

<script lang="ts" setup>
const isSubstitue = defineModel<boolean>()
</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
