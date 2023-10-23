<template lang="pug">
button(@click="onClick")
  div.button-interaction-animation(v-if="isClicked")
  slot

  

</template>
  
  
<script lang="ts" setup>
const button = ref()
const isClicked = ref(false)
const timeout = ref()

const onClick = () => {
  isClicked.value = true

  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => isClicked.value = false, 1000)
}
</script>
  
<style>
.button-interactive {
  --transition-slide-offset: 0.5rem;
}


.button-interaction-animation:after {
  content: '';
  display: block;
  width: 20%;
  height: 100%;
  opacity: 0.2;
  background: #fff;
}

.button-interaction-animation {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  animation-name: slide-left-right;
  animation-timing-function: ease;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
</style>