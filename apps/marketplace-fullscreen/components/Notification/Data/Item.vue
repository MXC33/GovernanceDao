<template lang ="pug">
//-cut="bottom-right b-ix-primary b-opacity-60 s-lg"
button(w="full")
  HList(items="center")
    VList(items="left" p="1")
      div(text="left ix-white") {{ message.title }} 
      div(text="left" v-html="message.message")
      div(v-if="message.price != null" text="ix-mint left") {{ message.price }} IXT
    div(grow="~")
    div(bg="red" w="1" h="1" rounded="full")
</template>

<script lang="ts" setup>
import type { NotificationBids } from '~/composables/useNeNotificationsAndMessages';

const {message} = defineProps<{
  message: NotificationBids
}>()

</script>