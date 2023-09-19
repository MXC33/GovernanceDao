<template lang="pug">
VList(pos="fixed top-[calc(7.5rem+var(--header-offset))] right-8 md:top-[calc(8.5rem+var(--header-offset))] right-8" z="999" space-y="3")
  TransitionGroup(name="snack")
    Snackbar(:notification="snack" v-for="snack in snackNotifications" :key="snack.timeout")
  
</template>

<script lang="ts" setup>
const { snackNotifications } = useSnackNotifications()

</script>

<style>
.snack-enter-from,
.snack-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}

.snack-enter-active,
.snack-leave-active {
  transition: all 300ms ease-in-out;
}
</style>