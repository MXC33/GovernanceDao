<template lang="pug">
SpinIcon.loading-spinner(w="6" aspect="square")
</template>   

<script lang="ts" setup>
const SpinIcon = await import('../../assets/images/icons/spinner.svg')
</script>
<style>
.loading-spinner {
  animation: loader-spin 1.6s linear infinite;
}

@keyframes loader-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-ellipsis {
  clip-path: inset(0 3ch 0 0);
  animation: dots 1s steps(4) infinite;
}

@keyframes dots {
  to {
    clip-path: inset(0 -1ch 0 0)
  }
}
</style>