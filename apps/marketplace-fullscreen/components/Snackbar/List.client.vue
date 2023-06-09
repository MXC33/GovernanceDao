<template lang="pug">
VList(pos="fixed bottom-6 right-6" z="999" space-y="3")
  TransitionGroup(name="snack")
    Snackbar(:notification="snack" v-for="snack in snackNotifications"  :key="snack.timeout")
  
</template>

<script lang="ts" setup>
const { snackNotifications } = useSnackNotifications()

</script>

<style>
.snack-enter-from,
.snack-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.snack-enter-active,
.snack-leave-active {
  transition: all 300ms ease;
}
</style>