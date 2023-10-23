<template lang="pug">
PriceRow()
  template(#left)
    PageSubTitle() Projected Total

  template(#right) 
    h3(space-x="2")
      span(text="subheading")
        GlitchText(:text="projectedIxt + ' IXT'") 
      span(text="detail")
        GlitchText(:text="'$' + projectedUsd")

</template>

<script lang="ts" setup>
defineProps<{
  projectedIxt: number,
  projectedUsd: number
}>()

</script>