<template lang ="pug">
//- remove hardcoded text use Jason data instead
VList(b="gray-400")
  VList(v-if="isValidData(data.today)" b="b-1 gray-400" p="3")
    div(w="full" b="b-1 gray-400" p="3") Today
    NotificationDataItem(v-for="message in data.today" :message="message.notification" b="b-1 gray-400" p="3")

  VList(v-if="isValidData(data.yesterday)")
    div(w="full" b="b-1 gray-400" p="3") Yesterday
    NotificationDataItem(v-for="message in data.yesterday" :message="message.notification" b="b-1 gray-400" p="3")
    
  VList(v-if="isValidData(data.old)")  
    div(w="full" b="b-1 gray-400" text="s gray-300" p="3") Old
    NotificationDataItem(v-for="message in data.old" :message="message.notification" b="b-1 gray-400" p="3")
  
  button(p="3" text="center" @click="More(data)") Load More
</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from 'composables/useNeNotificationsAndMessages';
const {loadMoreMessages} = useNeMessages()
const {loadMoreNotifications} = useNeNotifications()

const arrayNames = ['today', 'yesterday', 'old']

const {data} = defineProps<{
  data: NotificationData
}>()

const getValidData = (data: NotificationData) => {
  if(data.today.length > 0)
    return data.today[0]
  if(data.yesterday.length > 0)
    return data.yesterday[0]
  if(data.old.length > 0)
    return data.old[0]
  return null
}

const isNotafications = (data: NotificationData) => {
  const message = getValidData(data)
  if(message == null)
    return false
  if(message.notification.price != null)
    return true
  return false
}

const More = (data: NotificationData) => {
  console.log("More")
  if(isNotafications(data))
    loadMoreNotifications()
  else
    loadMoreMessages()
}

const isValidData = (arr :Notification[]) => arr.length > 0
</script>