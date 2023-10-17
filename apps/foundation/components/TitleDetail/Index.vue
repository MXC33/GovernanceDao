<template lang="pug">
VList()
  h6(v-if="$slots.detail" text="detail")
    slot(name="detail")

  h3(text="subheading")
    slot

</template>
  
<script lang="ts" setup>

</script>