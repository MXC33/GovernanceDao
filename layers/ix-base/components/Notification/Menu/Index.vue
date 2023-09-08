<template lang="pug">
//- remove hardcoded text and use jason data instead
//-VList(pos="fixed right-0 lg:right-7.5 lt-lg:left-0 top-$header-height" bg="ix-black" max-h="150" h="lt-lg:[calc(100vh-var(--header-height))]" 
      w="lg:100" overflow-y="auto" z="200" b="~ gray-700" )
VList(pos="fixed right-0 lg:right-7.5 lt-lg:left-0 lt-lg:top-$header-height top-[calc(15vh-var(--header-height))]" bg="ix-black" h="lt-lg:[calc(100vh-var(--header-height))]" w="lg:100" max-h="lg:150" overflow-y="auto" z="200" )
  //-pos="fixed  right-0 left-0 top-12" bg="black" h="[calc(100vh-var(--header-height))]" overflow-y="auto" z="200"
  //-frame="~ gray-400" display="lt-lg:none"
  VList(p="3" space-y="2")
    div(text="xl") Inbox

  //-HList(space-x="3" items="center")
  //-div(grid="cols-2 ~" bg="gray-700")
  div(grid="cols-2 ~")
    button(v-for="(title, index) in dataTitle" text="gray-300 s-selected:ix-white hover:ix-white" b="s-selected:b-1" p="3" @click="dataIndex = index" :state="selected(index)") {{ title }}
    //-button(v-for="(title, index) in dataTitle" text="gray-300 s-selected:ix-orange hover:ix-orange" b="s-selected:b-1" p="3" @click="dataIndex = index" :state="selected(index)") {{ title }}
  VList(p="3" space-y="2")
    HList(items="center")
      div(@click="reloadData" frame="~ gray-400")
        button(text="ix-white" b="s-selected:b-1" bg="s-selected:gray-700" p="3" @click="showUnreadNotifications = false" :state="showUnread(false)") All
        button(text="ix-white" b="s-selected:b-1" bg="s-selected:gray-700" p="3" @click="showUnreadNotifications = true" :state="showUnread(true)") Unread
      div(grow="~")
      HList(p="3")
        CheckMark(wh="6" P="3")
        button(row="~" text="right") Mark All As Read
  NotificationData.no-scrollbar(overflow="auto" h="full" v-if="notifications" :data="notifications")
  
</template>

<script lang="ts" setup>
import type { NotificationData } from 'composables/useNeNotificationsAndMessages';
import CheckMark from '~/assets/images/icons/Checkmark.svg'
//import MailIcon from '~/assets/images/icons/mail.svg'

const { data: messagesData, refresh: refreshMessages, readMessagesItem } = useNeMessages()
const { data: notificationData, refresh: refreshNotifications, readNotificationItem } = useNeNotifications()
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

const showUnread = (value: boolean) => showUnreadNotifications.value == value ? 'selected' : ''

const readAll = (data: NotificationData) => {
  for(let i = 0; i < data.today.length; i++){
    switch(data.today[i].notification.type){
      case 2:
        readNotificationItem(data.today[i])
      default:
        readMessagesItem(data.today[i])
    }
  }
}


const reloadData = () => {
  refreshMessages()
  refreshNotifications()
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