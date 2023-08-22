<template lang ="pug">
button(w="full")
  VList(items="center" p="1")
    div() {{ message.title }}
    div() {{ message.categories }} 
</template>

<script lang="ts" setup>
import type { NotificationMessage } from '~/composables/useNeNotificationsAndMessages';

const {message} = defineProps<{
  message: NotificationMessage
}>()

// const {message} = defineProps<{
//   message: string
// }>()

//message: string


console.log("message", message);

</script>