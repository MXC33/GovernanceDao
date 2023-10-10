<template lang ="pug">
HList.notification(w="full" @click="onClick" cursor="pointer on-nolink:default" :nolink="!link" opacity="hover:80 on-nolink:!100" transition="all" items="center" pos="relative")
  VList(items="left" p="1 r-3")
    h4(font="bold") {{ message.notification.title }} 
    HList(space-x="1")
      div(v-html="message.notification.message" color="gray-200")
      div(v-if="message.notification.price != null" text="ix-mint") {{ message.notification.price }} IXT

  div(grow="~")

  div(v-if="message.is_read == 0" bg="ix-mint" w="1" h="1" pos="absolute right-3 top-50%" translate-y="-50%" rounded="full")
    
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


const onClick = () => {
  if (link.value)
    window.open(link.value, '_blank')
  if (message.is_read == 0) {
    emitStatusUpdate(message)
    //This is ugly, Idealy we would want a function in useNeNotificationsAndMessages to handle the mutation of the notification 
    if (message.notification.type == 2) {
      readNotificationItem(message)
    } else {
      readMessagesItem(message)
    }
  }
}
</script>

<style>
.notification a {
  color: #FF6647;
}
</style>