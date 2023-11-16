<template lang="pug">
VList(space-y="2")
  h3(font="bold" capitalize="~")
    slot(name="header")

  div(grid="~ cols-4 gap-3")
    div(grid="col-span-3 on-full:col-span-4" :full="!$slots.action")
      VList()
        slot(name="value")
        slot()

        div(text="gray-300 sm" mt="0.5" v-if="$slots.detail")
          slot(name="detail")

    div(font="bold" v-if="$slots.action")
      VList()
        slot(name="action")
    
</template>
  
<script lang="ts" setup>
</script>
  