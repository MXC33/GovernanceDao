<template lang ="pug">
//- remove hardcoded text use Jason data instead
VList(b="gray-400")
  NotificationDataList(v-if="isValidData(data.today)" :notifications="data.today") Today
  NotificationDataList(v-if="isValidData(data.yesterday)" :notifications="data.yesterday") Yesterday
  NotificationDataList(v-if="isValidData(data.old)" :notifications="data.old") Old


  Transition(name="fade" mode="out-in")
    button(v-if="!isPending" p="3" text="center hover:ix-orange" @click="loadMore(data)") Load More
    div(v-else pb="3")
      HelperLoaderSpinnerSmall(mx="auto" wh="12" fill="ix-orange")


</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from 'composables/useNeNotificationsAndMessages';
const { loadMore: loadMoreMessages, pending: isMessagesPending } = useNeMessages()
const { loadMore: loadMoreNotifications, pending: isNotificationPending } = useNeNotifications()

const { data } = defineProps<{
  data: NotificationData
}>()


const isPending = computed(() => isMessagesPending.value || isNotificationPending.value)

const loadMore = (data: NotificationData) => {
  if (isNotifications(data))
    loadMoreNotifications()
  else
    loadMoreMessages()
}

const isNotifications = (data: NotificationData) => {
  const message = getValidData(data)
  if (message == null)
    return false
  if (message.notification.price != null)
    return true
  return false
}

const getValidData = (data: NotificationData) => {
  if (data.today.length > 0)
    return data.today[0]
  if (data.yesterday.length > 0)
    return data.yesterday[0]
  if (data.old.length > 0)
    return data.old[0]
  return null
}

const isValidData = (arr: Notification[]) => arr.length > 0
</script>