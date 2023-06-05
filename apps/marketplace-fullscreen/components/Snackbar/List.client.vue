<template lang="pug">
VList(pos="fixed bottom-6 right-6" z="300" space-y="3")
  TransitionGroup(name="snack")
    Snackbar(:notification="snack" v-for="snack in snackNotifications"  :key="snack.timeout")
  
</template>

<script lang="ts" setup>
const { snackNotifications } = useSnackNotifications()

</script>

<style>
/* 2. declare enter from and leave to state */
.snack-enter-from,
.snack-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.snack-enter-active,
.snack-leave-active {
  transition: all 300ms ease;
}
</style>