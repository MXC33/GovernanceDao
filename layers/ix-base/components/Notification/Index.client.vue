<template lang ="pug">
button(@click="toggleNotification" bg="s-unread:ix-orange" wh="2" rounded="full" :state="isUnread()")
  BellFilled(v-if="!showNotification" w="6" h="6")
  BellEmpty(v-else w="6" h="6")
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
  const notifications = []

  if(messagesData.value?.today)
    notifications.push(messagesData.value.today)
  if(messagesData.value?.today)
    notifications.push(messagesData.value.yesterday)
  if(messagesData.value?.today)
    notifications.push(messagesData.value.old)

  if(notificationData.value?.today)
    notifications.push(notificationData.value.today)
  if(notificationData.value?.today)
    notifications.push(notificationData.value.today)
  if(notificationData.value?.today)
    notifications.push(notificationData.value.today)

  for(let i = 0; i < notifications.length; i++){
    console.log("index", i, notifications[i])
    if(isUnreadInNotifications(notifications[i])){
      return 'unread'
    }
  }  
}

const isUnreadInNotifications = (Notifications: Notification[]) => {
  for(let i = 0; i < Notifications.length; i++){
    
    if(Notifications[i].is_read == 0)
      return true
  } 
}

</script>