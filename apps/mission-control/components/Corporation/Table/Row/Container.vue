<template lang="pug">
div(grid="~ cols-8 gap-1" uppercase="~" text="sm")
  div(v-if="$slots.icon" grid="col-span-8 md:col-span-4" flex="~ row")
    div(aspect="square" max-w="10")
      slot(name="icon")

    div(font="bold" flex="~ grow") 
      slot(name="left")

  div(grid="col-span-8 md:col-span-4" font="bold" flex="~" v-else) 
    slot(name="left")

  div(grid="col-span-8 col-start-1 md:col-span-4" flex="~")

    slot(name="right")

</template>

<script lang="ts" setup>
</script>