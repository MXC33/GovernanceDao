<template lang ="pug">
div()
  button(@click="toggleNotification" pos="relative" opacity="hover:80" transition="all")
    span(bg="s-unread:ix-orange" wh="2" display="block" rounded="full" :state="isUnread" pos="absolute")
    BellFilled(v-if="!showNotification" w="6")
    BellEmpty(v-else w="6")
  Transition(name="slide-top" mode="out-in")
    NotificationMenu(v-if="showNotification")
</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/ui/notifications/bellFilled.svg'
import BellEmpty from '~/assets/images/ui/notifications/bellEmpty.svg'
//import { useNeMessages, useNeNotifications } from 'composables/useNeNotificationsAndMessages';
import type { Notification } from '~/composables/useNeNotificationsAndMessages';
const showNotification = ref(false)

const toggleNotification = () => {
  showNotification.value = !showNotification.value
  console.log(showNotification.value)
}


const { data: messagesData } = useNeMessages()
const { data: notificationData } = useNeNotifications()

const isUnread = computed(() => {
  //Messages
  const todayMessagesUnread = messagesData.value?.today && isUnreadInNotifications(messagesData.value.today)
  const yesterdayMessagesUnread = messagesData.value?.yesterday && isUnreadInNotifications(messagesData.value.yesterday)
  const oldMessagesUnread = messagesData.value?.old && isUnreadInNotifications(messagesData.value.old)

  if (todayMessagesUnread || yesterdayMessagesUnread || oldMessagesUnread)
    return 'unread'

  //Notification
  const todayNotificationUnread = notificationData.value?.today && isUnreadInNotifications(notificationData.value.today)
  const yesterdayNotificationUnread = notificationData.value?.yesterday && isUnreadInNotifications(notificationData.value.yesterday)
  const oldNotificationUnread = notificationData.value?.old && isUnreadInNotifications(notificationData.value.old)

  if (todayNotificationUnread || yesterdayNotificationUnread || oldNotificationUnread)
    return 'unread'
})

const isUnreadInNotifications = (notifications: Notification[]) => {
  return notifications.some((notification) => notification.is_read == 0)
}
</script>