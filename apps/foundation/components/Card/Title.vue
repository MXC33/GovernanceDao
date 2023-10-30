<template lang="pug">
VList()
  div(text="subheading on-large:2xl" font="bold" v-if="$slots.default" :large="large") 
    slot()

  div(text="ix-orange" v-if="$slots.subtitle")
    slot(name="subtitle")

  div(text="detail" v-if="$slots.detail")
    slot(name="detail")

  div(text="subheading on-large:2xl" font="bold" v-if="$slots.default" :large="large") 
    slot(name="price")

</template>

<script lang="ts" setup>
defineProps<{
  large?: boolean
}>()
</script>