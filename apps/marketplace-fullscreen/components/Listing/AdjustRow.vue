<template lang="pug">
VList(space-y="2")
  h3(font="bold")
    slot(name="header")

  div(grid="~ cols-4 gap-3")
    div(grid="col-span-3")
      VList()
        slot(name="value")

    div(font="bold")
      VList()
        slot(name="action")
    
</template>
  
<script lang="ts" setup>
</script>
  