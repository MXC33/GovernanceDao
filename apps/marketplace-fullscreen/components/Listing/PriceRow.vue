<template lang="pug">
HList(justify="between")
  div(text="gray-200")
    slot(name="name")

  div(font="bold")
    slot(name="value")
    
</template>
  
<script lang="ts" setup>
</script>
  