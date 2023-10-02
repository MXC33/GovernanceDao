<template lang="pug">
TaskManagerCorporationSection() 
  template(#title) Selling Waste

  template(#default)
    TaskManagerOrderList(:corporation-order-id="{type: 'gws', task: 'craft'}")

</template>

<script setup lang="ts">



</script>
