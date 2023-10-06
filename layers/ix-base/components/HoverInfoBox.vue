<template lang="pug">
div#infobox(:style="values" z="999" pos="fixed" translate-x="-10" translate-y="-12")
</template>

<script lang="ts" setup>

const { x, y } = useMouse({ type: 'client' })

const values = computed(() => {

  const xPos = x.value
  const yPos = y.value

  return {
    top: `${yPos}px`,
    left: `${xPos}px`
  }
})

</script>