<template lang="pug">
div(flex-center="row")
  div(flex="~ row" align="item-center" justify="center" mr="2")
    i(class="arrow left")
    i(class="arrow left")
    i(class="arrow left")
  slot
</template>

<script setup>

</script>

<style>
.arrow {
  width: 3px;
  height: 9px;
  border: solid var(mc-orange);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>