<template lang="pug">
Card()
  VList(space-y="3")
    CardTitle(:large="true")
      slot(name="title")

    div(text="gray-300") 
      slot(name="description")

  template(#detailRight)
    VList(space-y="3")
      slot(name="icons")

</template>

<script lang="ts" setup>


</script>