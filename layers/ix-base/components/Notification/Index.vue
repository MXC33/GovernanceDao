<template lang ="pug">
VList(pos="relative" ref="container")
  div(@click.prevent.stop="toggleNotification" w="6" h="6" translate-y="-0.5" cursor="pointer" opacity="hover:80" transition="opacity")
    BellFilled(v-show="!showNotification")
    BellEmpty(v-show="showNotification")

    NotificationIconUnread(v-show="isUnread")

Teleport(to="#navigation-bottom" v-if="showNotification")
  NotificationMenu( ref="element")

</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/icons/bellFilled.svg'
import BellEmpty from '~/assets/images/icons/bellEmpty.svg'
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { data: messagesData } = useNeMessages()
const { data: notificationData } = useNeNotifications()

const showNotification = shallowRef(false)

const toggleNotification = () => {
  showNotification.value = !showNotification.value
}

const element = ref()
const container = ref()

onClickOutside(element, () => {
  if (showNotification.value)
    showNotification.value = false
}, { ignore: [container] })

const isUnread = computed(() => {

  const anyUnread = [
    hasUnread(messagesData.value?.today),
    hasUnread(messagesData.value?.yesterday),
    hasUnread(messagesData.value?.old),
    hasUnread(notificationData.value?.today),
    hasUnread(notificationData.value?.yesterday),
    hasUnread(notificationData.value?.old)
  ]

  return anyUnread.some((isUnread) => isUnread)
})

const hasUnread = (notifications?: Notification[]) => {
  return notifications && notifications.some((notification) => notification.is_read == 0)
}
</script>