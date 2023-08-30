<template lang ="pug">
//-cut="bottom-right b-ix-primary b-opacity-60 s-lg"
button(w="full" text="hover:ix-orange" @click="onClick")
  HList(items="center")
    VList(items="left" p="1 r-3" )
      div(text="left") {{ message.notification.title }} 
      div(text="left" v-html="message.notification.message")
      div(v-if="message.notification.price != null" text="ix-mint left") {{ message.notification.price }} IXT
    div(grow="~")
    div(v-if="message.is_read == 0" bg="red" wh="1" rounded="full")
</template>

<script lang="ts" setup>
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { socket, emitStatusUpdate } = useSocket()

const { message } = defineProps<{
  message: Notification
}>()

const onClick = () => {
  console.log("onClick")
  console.log(message)
  if (message.is_read == 0) {
    socket.emit('notification_read', message.notification.id)
    emitStatusUpdate(message)
    message.is_read = 1
  }
}

</script>