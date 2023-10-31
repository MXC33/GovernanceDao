<template lang ="pug">
HList.notification-item(:class="[isLink || isAllowance ? 'is-link' : '']" w="full" @click="onClick" transition="all" items="center" pos="relative" b="b-1 gray-400" p="3")
  VList(items="left" p="1 r-3")
    h4(font="bold") {{ message.notification.title }}
    HList(space-x="1")
      div(v-html="message.notification.message" color="gray-200")
      div(v-if="message.notification.price != null" text="ix-mint") {{ message.notification.price }} IXT

  div(grow="~")

  NotificationIconUnreadMessage(v-if="message.is_read == 0")

  div(pos="absolute" inset="0" bg="ix-black opacity-60" v-if="!!showNotificationLoader['nt'+message.notification.id] && message.notification.type == 12" )
    div(pos="absolute-center")
      HelperLoader(fill="ix-orange" w="5")

</template>

<script lang="ts" setup>
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { emitStatusUpdate } = useSocket()
const { readItem: readNotificationItem } = useNeNotifications()
const { readItem: readMessagesItem } = useNeMessages()

const { message } = defineProps<{
  message: Notification
}>()

const link = computed(() => {
  switch (message.notification.type) {
    case 2:
      return `https://planetix.com/netempire/pix-inspector/${message.notification.pix_id}`
    default:
      return null
  }
})

const isLink = computed(() => !!link.value)

const isAllowance = computed(() => message.notification.type == 12)
const {showNotificationLoader, allowance} = useNotificationAllowance()


const onClick = async () => {
  if (link.value)
    window.open(link.value, '_blank')
  if (message.is_read == 0) {
    emitStatusUpdate(message)
    //This is ugly, Idealy we would want a function in useNeNotificationsAndMessages to handle the mutation of the notification
    if (message.notification.type == 2) {
      readNotificationItem(message)
    } if (message.notification.type == 12) {
      await allowance(message)
    } else {
      readMessagesItem(message)
    }
  }
}
</script>

<style>
.notification-item a {
  color: #FF6647;
}

.notification-item.is-link:hover {
  opacity: 50%;
}

.notification-item.is-link {
  cursor: pointer;
}
</style>
