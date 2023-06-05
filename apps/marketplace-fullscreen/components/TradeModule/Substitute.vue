<template lang="pug">
HList(px="3 md:6" py="3" b="t-1 b-1 gray-600" space-x="3" items="center" justify="between" w="full" min-h="18")
  VList(fold="md" gap="3" w="full" whitespace="nowrap")
    InputCheckbox(v-model="isSubstitue")
      span(color="gray-200") 
        slot(name="title")

  Transition(name="slide-right")
    HList(color="white" w="full" justify="start md:end"  whitespace="nowrap" gap="3" items="center" v-if="isSubstitue")
      slot(name="substituteTitle")

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
