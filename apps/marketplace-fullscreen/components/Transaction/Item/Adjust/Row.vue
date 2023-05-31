<template lang="pug">
VList(space-y="2")
  h3(font="bold")
    slot(name="header")

  div(grid="~ cols-4 gap-3")
    div(grid="col-span-3 on-full:col-span-4" :full="!$slots.action")
      VList()
        slot(name="value")

    div(font="bold" v-if="$slots.action")
      VList()
        slot(name="action")
    
</template>
  
<script lang="ts" setup>
</script>
  