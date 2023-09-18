<template lang="pug">
div(flex="~ row" items="center")
  div(w="1" aspect="square" mx="3" bg="mc-orange" class="shadow-orange")
  div(flex="~ col")
    p(text="xs mc-orange" text-shadow="mc-orange" uppercase="~") {{ title }}
</template>

<script setup>
defineProps(
  {
    title: String
  }
)
</script>

<style>
.shadow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}
</style>