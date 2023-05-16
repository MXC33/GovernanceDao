<template lang="pug">
VList()
  ContentDrawer()
    template(#header) Test 
    template(#default)
      ContentDrawer()
        template(#default)
          InputRadio()
</template>

<script lang="ts" setup>

</script>