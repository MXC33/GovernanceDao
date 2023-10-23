<template lang="pug">
Card()
  VList(space-y="3")
    h4(text="heading") 
      slot(name="title")

    div(text="gray-300") 
      slot(name="description")

  template(#detailRight)
    VList(space-y="3")
      slot(name="icons")

</template>

<script lang="ts" setup>


</script>