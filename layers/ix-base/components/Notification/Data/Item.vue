<template lang ="pug">
//-cut="bottom-right b-ix-primary b-opacity-60 s-lg"
VList.notification(w="full" @click="onClick" cursor="on-link:pointer" :link="!!link")
  HList(items="center")
    VList(items="left" p="1 r-3")
      h4(font="bold") {{ message.notification.title }} 
      div(v-html="message.notification.message" color="gray-200")
      div(v-if="message.notification.price != null" text="ix-mint") {{ message.notification.price }} IXT
    div(grow="~")
    div(p="1")
      div(v-if="message.is_read == 0"  bg="red" wh="1" rounded="full")
</template>

<script lang="ts" setup>
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { socket, emitStatusUpdate } = useSocket()

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
  console.log("onClick")
  console.log(message)
  if (link.value)
    window.open(link.value, '_blank')
  if (message.is_read == 0) {
    socket.emit('notification_read', message.notification.id)
    emitStatusUpdate(message)
    //This is ugly, Idealy we would want a function in useNeNotificationsAndMessages to handle the mutation of the notification 
    message.is_read = 1
  }
}

</script>

<style>
.notification a {
  color: #FF6647;
}
</style>