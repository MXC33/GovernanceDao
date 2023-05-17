<template lang="pug">
VList(items="center" justify="center" bg="gray-900" flex-grow="1" pos="relative")

  VList(items="start")
    CollectionFilterToggleFilter(@click="showFilters")
  //- Above generic wrapper - testing components under
  VList(w="full" bg="yellow" justify="center" items="center")
    transition(name="slide-left")
      ContentDrawerWrapper(v-if="toggler")

</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const toggler = ref(false)
const showFilters = () => {
  toggler.value = !toggler.value
}
</script>