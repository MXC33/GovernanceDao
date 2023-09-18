<template lang="pug">
div(flex="~ row" justify="start" space-x="2" text="xs" font="bold" color="white" items="center")
  SpinIcon.loading-spinner(w="full" aspect="square" max-w="6")
  .loading-ellipsis
    slot
</template>   

<script lang="ts" setup>
import SpinIcon from '~/assets/images/ui/icon-spinner.svg'
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