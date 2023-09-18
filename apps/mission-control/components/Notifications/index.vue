<template lang="pug">
Transition(:name="isMobile ? 'slide-bottom' : 'slide-right'")
  NotificationsPopup(v-if="activeNotification" :notification="activeNotification" :key="activeNotification.id")
  
</template>

<script setup lang="ts">
const { activeNotification } = useNotifications()
const isMobile = useMobileBreakpoint('md')
const route = useRoute()

</script>
