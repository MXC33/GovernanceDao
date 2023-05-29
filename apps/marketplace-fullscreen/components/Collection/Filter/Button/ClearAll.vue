<template lang="pug">
HList(cut="top-right sm !b-gray-400 hover:(!b-ix-primary)" items="center" px="3.5" py="2" cursor="pointer" group)
  span(color="gray-200 group-hover:gray-100" text="sm" translate-y="0.5" font="bold" @click="$emit('clear')") Clear All
</template>

<script lang="ts" setup>
</script>