<template lang="pug">
VList(p="3")
  div(w="full" b="b-1 gray-400" p="3")
    slot() 
  NotificationDataItem(v-for="message in notifications" :message="message.notification" b="b-1 gray-400" p="3")
</template>

<script lang="ts" setup>
import type { Notification } from 'composables/useNeNotificationsAndMessages';

defineProps<{
  notifications: Notification[]
}>()

</script>