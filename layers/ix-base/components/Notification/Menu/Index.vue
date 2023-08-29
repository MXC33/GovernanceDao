<template lang="pug">
//- remove hardcoded text and use jason data instead
VList(pos="fixed right-0 lg:right-7.5 lt-lg:left-0 top-$header-height" bg="ix-black" max-h="150" h="lt-lg:[calc(100vh-var(--header-height))]" w="lg:100" overflow-y="auto" z="200" b="~ gray-700")

  VList(p="3" space-y="2")
    div(text="xl") Inbox

    HList(items="center")
      button(grow="~" text="left" @click="showUnreadNotifications = showUnreadNotifications") Show Only Unread
      InputCheckbox(v-model="showUnreadNotifications" @click="reloadData")

    NotificationMenuButton()
      template(#default) 
        | Mark all as read
      template(#icon)
        MailIcon(wh="6")

  //-HList(space-x="3" items="center")
  div(grid="cols-2 ~" bg="gray-700")
    button(v-for="(title, index) in dataTitle" text="s-selected:ix-orange hover:ix-orange" b="s-selected:b-1" p="3" bg="gray-700"  @click="dataIndex = index" :state="selected(index)") {{ title }}


  //- fix this look bad having 2 NotificationData, should only use 1 and dynamically change the data to display
  //-NotificationData.no-scrollbar(overflow="auto" max-h="85" v-if="notifications[dataIndex] != null" :data="notifications")
  NotificationData.no-scrollbar(overflow="auto" h="full" v-if="notifications" :data="notifications")
  //-NotificationData.no-scrollbar(overflow="auto" max-h="85" v-if="messagesData && dataIndex == 1" :data="messagesData")
  
</template>

<script lang="ts" setup>
import type { NotificationData } from 'composables/useNeNotificationsAndMessages';
import MailIcon from '~/assets/icons/mail.svg'

const { data: messagesData, refresh: refreshMessages } = useNeMessages()
const { data: notificationData, refresh: refreshNotifications } = useNeNotifications()
const { showUnreadNotifications } = useNotificationSettings()

const notifications = computed(() => {
  if (dataIndex.value == 0)
    return notificationData.value

  if (dataIndex.value == 1)
    return messagesData.value

})

const isMounted = useMounted()
const dataIndex = ref(0)

const dataTitle = ['Notifications', 'Messages']

const reloadData = () => {
  console.log("reloadData")
  console.log(messagesData.value?.count)
  refreshMessages()
  refreshNotifications()
  console.log(messagesData.value?.count)
}

const selected = (index: number) => {
  if (dataIndex.value == index) {
    return 'selected'
  }

  return 'default'
}

const lockScroll = (active: boolean) => {
  document.body.classList.toggle("is-scroll-locked", active)
}

watch([isMounted], ([mounted]) => {
  const enable = mounted
  if (!process.client) {
    return
  }
  lockScroll(enable)
}, { immediate: true })

onUnmounted(() => {
  lockScroll(false)
})

const notificationsSize = 5

const getDataLength = (data: NotificationData) => {
  return Math.ceil((data.today.length + data.yesterday.length + data.old.length) / notificationsSize) + 1
}

</script>