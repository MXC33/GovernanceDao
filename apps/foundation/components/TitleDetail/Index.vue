<template lang="pug">
VList()
  h6(v-if="$slots.detail" text="detail")
    slot(name="detail")

  h3(text="subheading")
    slot

  h6(v-if="$slots.detailBottom" text="detail")
    slot(name="detailBottom")

</template>
  
<script lang="ts" setup>

</script>