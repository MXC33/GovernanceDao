<template lang="pug">
PriceRow()
  template(#left)
    PageSubTitle() Projected Total

  template(#right) 
    h3(space-x="2")
      span(text="subheading") {{projectedIxt}} IXT
      span(text="detail") ${{projectedUsd}}

</template>

<script lang="ts" setup>
defineProps<{
  projectedIxt: number,
  projectedUsd: number
}>()

</script>