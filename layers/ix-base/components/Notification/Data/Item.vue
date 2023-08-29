<template lang ="pug">
//-cut="bottom-right b-ix-primary b-opacity-60 s-lg"
button(w="full" text="hover:ix-orange")
  HList(items="center")
    VList(items="left" p="1")
      div(text="left") {{ message.notification.title }} 
      div(text="left" v-html="message.notification.message")
      div(v-if="message.notification.price != null" text="ix-mint left") {{ message.notification.price }} IXT
    div(grow="~")
    div(v-if="message.is_read == 0" bg="red" w="1" h="1" rounded="full")
</template>

<script lang="ts" setup>
import type { Notification } from '~/composables/useNeNotificationsAndMessages';

const { message } = defineProps<{
  message: Notification
}>()

</script>