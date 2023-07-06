<template lang="pug">
div(flex="~ row" px="4 md:6" py="4 md:3" b="t-1 gray-600 md:(t-1 b-1 gray-600)" items="center" grid="~ cols-2" justify="between")
  div(grid="col-span-1" gap="3" w="full" whitespace="nowrap")
    InputCheckbox(v-model="isSubstitue")
      span(color="gray-200") 
        slot(name="title")

  div(flex="~ row" grid="col-span-1" color="white" align="lt-md:left" whitespace="nowrap" w="full md:100%" gap="1 md:3" items="start md:center" v-if="isSubstitue")
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
