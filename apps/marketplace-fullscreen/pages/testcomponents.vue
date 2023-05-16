<template lang="pug">
VList(items="center" justify="center" bg="gray-900" flex-grow="1")
  //- Above generic wrapper - testing components under
  VList(w="full" bg="yellow")
      ContentDrawer
        template(#header) TEST

      ContentDrawerWrapper
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

</script>