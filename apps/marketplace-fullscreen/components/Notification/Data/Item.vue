<template lang ="pug">
button(w="full")
  VList(items="center" p="1")
    div() {{ message.title }} 
</template>

<script lang="ts" setup>
import type { NotificationMessage } from '~/composables/useNeNotificationsAndMessages';

const {message} = defineProps<{
  message: NotificationMessage
}>()

console.log("message", message);

</script>