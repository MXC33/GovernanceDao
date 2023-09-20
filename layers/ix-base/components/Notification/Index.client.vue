<template lang ="pug">
VList(pos="relative" ref="container")
  div(@click.prevent.stop="toggleNotification" bg="s-unread:ix-orange" rounded="full" :state="isUnread" wh="6" translate-y="-0.5" cursor="pointer" opacity="hover:80" transition="opacity")
    BellFilled(v-if="!showNotification")
    BellEmpty(v-else)

  Teleport(to="#navigation-bottom")
    Transition(name="fade-slow")
      NotificationMenu(v-if="showNotification" ref="element")

</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/ui/notifications/bellFilled.svg'
import BellEmpty from '~/assets/images/ui/notifications/bellEmpty.svg'
import type { Notification } from '~/composables/useNeNotificationsAndMessages';
const showNotification = ref(false)

const toggleNotification = () => {
  showNotification.value = !showNotification.value
}

const element = ref()
const container = ref()


onClickOutside(element, () => {
  if (showNotification.value)
    showNotification.value = false
}, { ignore: [container] })

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