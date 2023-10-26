<template lang="pug">
div(grid="~ gap-6 lg:cols-2" p="4"  )
  // This will render the card 4 times
  Card(v-for="n in 2" :key="n" grid="~ gap-6 lg:cols-1" p="4" bg="gray-900")
    HList() 
      div
        VList(space-y="2")

    HList(space-x="4" pt="4")
      div()


  Card(v-for="n in 2" :key="n" grid="~ gap-6 lg:cols-1" p="4" bg="gray-900")
    HList() 
      div
        VList(space-y="2")


    HList(space-x="4" pt="4")
      div()
        

  </template>
    
<script lang="ts" setup>

</script>