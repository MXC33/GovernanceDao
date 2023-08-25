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
  
  button(p="3" text="center" @click="loadMore(data)") Load More
</template>

<script lang="ts" setup>
import type { NotificationData, Notification } from 'composables/useNeNotificationsAndMessages';

const arrayNames = ['today', 'yesterday', 'old']

const {data} = defineProps<{
  data: NotificationData
}>()

const loadMore = (data: NotificationData) => {
  console.log(data)
}

const isValidData = (arr :Notification[]) => arr.length > 0
</script>