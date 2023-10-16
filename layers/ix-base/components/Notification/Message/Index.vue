<template lang ="pug">
VList(pos="relative" overflow="auto" h="full" )

  VList(b="gray-400" space-y="3" v-if="data")
    NotificationMessageList(v-if="isValidData(data.today)" :notifications="data.today") Today
    NotificationMessageList(v-if="isValidData(data.yesterday)" :notifications="data.yesterday") Yesterday
    NotificationMessageList(v-if="isValidData(data.old)" :notifications="data.old") Old

    Transition(name="fade")
      button(p="3" text="center hover:ix-orange" @click="loadMore(data)") Load More

</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from '~/composables/useNeNotificationsAndMessages';

const { loadMore: loadMoreMessages } = useNeMessages()
const { loadMore: loadMoreNotifications } = useNeNotifications()

const { data } = defineProps<{
  data?: NotificationData
}>()

const loadMore = (data: NotificationData) => {
  if (isNotifications(data))
    loadMoreNotifications()
  else
    loadMoreMessages()
}

const isNotifications = (data: NotificationData) => {
  if (!data)
    return false

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