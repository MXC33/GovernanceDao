<template lang="pug">
VList(pos="fixed bottom-8 right-8" z="999" space-y="3" transition="all")
  TransitionGroup(name="snack")
    SnackNotificationsItem(:notification="snack" v-for="snack in notifications" :key="snack.timeout")
  
</template>

<script lang="ts" setup generic="T extends string">
import type { SnackNotification } from 'composables/useSnackNotifications';

const { notifications } = defineProps<{
  notifications: SnackNotification<T>[]
}>()

console.log("NOTS", notifications)
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