<template lang="pug">
div.loading-skeleton(flex="~ col")
</template>

<style scoped>
.loading-skeleton {
  background: #000;
  background: linear-gradient(270deg, #333333 0%, rgba(51, 51, 51, 0) 50%, #333333 100%);
  background-size: 400% 100%;
  animation: 6s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: 400%;
  }
}
</style>