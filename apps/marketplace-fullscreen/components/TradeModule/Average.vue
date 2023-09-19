<template lang="pug">
VList(px="3 md:6"  pb="4")
  h3(color="gray-200") 
    slot(name="title")

  HList(items="end" space-x="3")
    span(color="white" font="bold") 
      slot(name="ixt") 

    span(color="gray-200") 
      slot(name="percentage")

</template>

<script lang="ts" setup>
</script>
