<template lang ="pug">
button(@click="toggleNotification" bg="s-unread:ix-orange" wh="2" rounded="full" :state="isUnread()")
  div(w="6" h="6")
    BellFilled(v-if="!showNotification")
    BellEmpty(v-else)
Transition(name="slide-top" mode="out-in")
  NotificationMenu(v-if="showNotification")
</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/icons/bellFilled.svg'
import BellEmpty from '~/assets/images/icons/bellEmpty.svg'
//import { useNeMessages, useNeNotifications } from 'composables/useNeNotificationsAndMessages';
import type { Notification } from '~/composables/useNeNotificationsAndMessages';
const showNotification = ref(false)

const toggleNotification = () =>
  showNotification.value = !showNotification.value

const { data: messagesData } = useNeMessages()
const { data: notificationData } = useNeNotifications()

const isUnread = () => {
  //Messages
  const todayMessagesUnread = messagesData.value?.today && isUnreadInNotifications(messagesData.value.today)
  const yesterdayMessagesUnread = messagesData.value?.yesterday && isUnreadInNotifications(messagesData.value.yesterday)
  const oldMessagesUnread = messagesData.value?.old && isUnreadInNotifications(messagesData.value.old)
  
  if(todayMessagesUnread || yesterdayMessagesUnread || oldMessagesUnread)
    return 'unread'

  //Notification
  const todayNotificationUnread = notificationData.value?.today && isUnreadInNotifications(notificationData.value.today)
  const yesterdayNotificationUnread = notificationData.value?.yesterday && isUnreadInNotifications(notificationData.value.yesterday)
  const oldNotificationUnread = notificationData.value?.old && isUnreadInNotifications(notificationData.value.old)

  if(todayNotificationUnread || yesterdayNotificationUnread || oldNotificationUnread)
    return 'unread'
}

const isUnreadInNotifications = (Notifications: Notification[]) => {
  for(let i = 0; i < Notifications.length; i++){
    if(Notifications[i].is_read == 0)
      return true
  } 
}

</script>