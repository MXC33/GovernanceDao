<template lang="pug">
VList(justify="center" space-y="4" color="$mc-accent" items="center")
  .loading-spinner(b="4 $mc-accent-10 l-$mc-accent l-opacity-100" rounded="full" w="full" aspect="square" max-w="20")
  slot
</template>   

<script lang="ts" setup>

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
</style>