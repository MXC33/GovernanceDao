<template lang ="pug">
HList(space-x="3" items="center" bg="gray-700")
  div(grow="~")
  button(p="2") Notefications 
  button(p="2") Messages 
  div(grow="~")
VList(b="gray-400")
  VList(v-if="isValidData(messagesData.today)" b="b-1 gray-400" p="3")
    div(w="full" b="b-1 gray-400" p="3") Today
    NotificationDataItem(v-for="message in messagesData.today" :message="message.notification" b="b-1 gray-400" p="3")

  VList(v-if="isValidData(messagesData.yesterday)")
    div(w="full" b="b-1 gray-400" p="3") Yesterday
    NotificationDataItem(v-for="message in messagesData.yesterday" :message="message.notification" b="b-1 gray-400" p="3")
    
  VList(v-if="isValidData(messagesData.old)")  
    div(w="full" b="b-1 gray-400" text="s gray-300" p="3") Old
    NotificationDataItem(v-for="message in messagesData.old" :message="message.notification" b="b-1 gray-400" p="3")
</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from 'composables/useNeNotificationsAndMessages';


const {messagesData} = defineProps<{
  messagesData: NotificationData
}>()


const isValidData = (arr :Notification[]) => arr.length > 0

console.log("messagesData", messagesData)

</script>