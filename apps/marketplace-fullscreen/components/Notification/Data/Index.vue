<template lang ="pug">
VList(b="gray-400" items="center")
  VList(v-if="isValidData(messagesData.today)")
    div(w="full" b="b-1 gray-400" text="center") Today
    NotificationDataItem(v-for="message in messagesData.today" :message="message.notification")

  VList(v-if="isValidData(messagesData.yesterday)")
    div(w="full" b="b-1 gray-400" text="center") Yesterday
    NotificationDataItem(v-for="message in messagesData.yesterday" :message="message.notification")
    
  VList(v-if="isValidData(messagesData.old)" items="center")  
    div(w="full" b="b-1 gray-400" text="center") Old
    NotificationDataItem(v-for="message in messagesData.old" :message="message.notification" b="b-1 gray-400")
</template>

<script lang="ts" setup>

const {messagesData} = defineProps<{
  messagesData: NotificationData
}>()

const isValidData = (arr :Notification[]) => arr.length > 0

console.log("messagesData", messagesData)

</script>