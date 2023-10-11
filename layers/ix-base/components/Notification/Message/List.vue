<template lang="pug">
VList()
  div(w="full" b="b-1 gray-400" p="x-3 b-3" font="bold")
    slot() 

  NotificationMessageItem(v-for="message in notifications" :message="message")

</template>

<script lang="ts" setup>
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { notifications } = defineProps<{
  notifications: Notification[]
}>()
</script>