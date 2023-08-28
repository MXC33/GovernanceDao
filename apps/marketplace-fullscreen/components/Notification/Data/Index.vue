<template lang ="pug">
//- remove hardcoded text use Jason data instead
VList(b="gray-400")
  NotificationDataList(v-if="isValidData(data.today)" :notifications="data.today") Today
  NotificationDataList(v-if="isValidData(data.yesterday)" :notifications="data.yesterday") Yesterday
  NotificationDataList(v-if="isValidData(data.old)" :notifications="data.old") Old
  button(p="3" text="center" @click="LoadMore(data)") Load More
</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from 'composables/useNeNotificationsAndMessages';
const { loadMoreMessages } = useNeMessages()
const { loadMoreNotifications } = useNeNotifications()

const arrayNames = ['today', 'yesterday', 'old']

const { data } = defineProps<{
  data: NotificationData
}>()

const getValidData = (data: NotificationData) => {
  if (data.today.length > 0)
    return data.today[0]
  if (data.yesterday.length > 0)
    return data.yesterday[0]
  if (data.old.length > 0)
    return data.old[0]
  return null
}

const isNotifications = (data: NotificationData) => {
  const message = getValidData(data)
  if (message == null)
    return false
  if (message.notification.price != null)
    return true
  return false
}

const LoadMore = (data: NotificationData) => {
  if (isNotifications(data))
    loadMoreNotifications()
  else
    loadMoreMessages()
}

const isValidData = (arr: Notification[]) => arr.length > 0
</script>