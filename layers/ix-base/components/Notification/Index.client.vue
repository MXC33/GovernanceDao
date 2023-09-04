<template lang ="pug">
button(@click="toggleNotification" bg="s-unread:ix-orange" wh="2" rounded="full" :state="isUnread")
  BellFilled(v-if="!showNotification" w="6" h="6")
  BellEmpty(v-else w="6" h="6")
Transition(name="slide-top" mode="out-in")
  NotificationMenu(v-if="showNotification")
</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/icons/bellFilled.svg'
import BellEmpty from '~/assets/images/icons/bellEmpty.svg'
//import { useNeMessages, useNeNotifications } from 'composables/useNeNotificationsAndMessages';
const showNotification = ref(false)

const toggleNotification = () =>
  showNotification.value = !showNotification.value

const { data: messagesData } = useNeMessages()
const { data: notificationData } = useNeNotifications()

const isUnread = () => {
  const notification = [
    messagesData.value?.today,
    messagesData.value?.yesterday,
    messagesData.value?.today,
    notificationData.value?.today,
    notificationData.value?.yesterday,
    notificationData.value?.today]

  for (let i = 0; i < notification.length; i++) {
    for (let j = 0; j < notification[i].length; j++) {
      if (notification[i][j].is_read == 0) {
        return 'unread'
      }
    }
  }
}

</script>