<template lang ="pug">
//-cut="bottom-right b-ix-primary b-opacity-60 s-lg"
button(w="full" )
  HList(items="center")
    VList(items="left" p="1")
      div(text="left") {{ message.title }} 
      HList()
        div(text="left" v-html="message.message") 
        div() {{ message.price }}
</template>

<script lang="ts" setup>
import type { NotificationBids, NotificationMessage } from '~/composables/useNeNotificationsAndMessages';

const {message} = defineProps<{
  message: NotificationBids
}>()

</script>