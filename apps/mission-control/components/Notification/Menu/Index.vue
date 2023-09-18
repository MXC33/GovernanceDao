<template lang="pug">
VList(pos="absolute right-0 lt:lg:right-4 lt-lg:left-0 top-full" bg="ix-black" max-h="lg:150" h="100vh" w="lg:100" overflow-y="auto" b="~ gray-700" text="white")
  VList(p="3" space-y="2")
    div(text="xl") Inbox
    div(grid="cols-2 ~")
      button(v-for="(title, index) in dataTitle" text="gray-300 s-selected:ix-white hover:ix-white" b="s-selected:b-1" p="3" @click="dataIndex = index" :state="selected(index)") {{ title }}

    VList(p="3" space-y="2")
      HList(items="center")
        div(@click="reloadData" b="~" text="gray-300")
          button(text="s-selected:ix-white"  bg="s-selected:gray-700" p="3" @click="showUnreadNotifications = false" :state="showUnread(false)") All
          button(text="s-selected:ix-white"  bg="s-selected:gray-700" p="3" @click="showUnreadNotifications = true" :state="showUnread(true)") Unread
        div(grow="~")
        button(grow="~" text="right" @click="readAll") Mark All As Read
    div(v-if="!notifications") No Notification With Current Filter
  NotificationData.no-scrollbar(overflow="auto" h="full" v-if="notifications" :data="notifications")
</template>

<script lang="ts" setup>
const { data: messagesData, refresh: refreshMessages } = useNeMessages()
const { data: notificationData, refresh: refreshNotifications, markAllAsRead: markNotificationsRead } = useNeNotifications()
const { showUnreadNotifications } = useNotificationSettings()

const isMounted = useMounted()
const dataIndex = ref(0)
const dataTitle = ['Notifications', 'Messages']

const isNotificationsActive = computed(() => dataIndex.value == 0)

const notifications = computed(() => {
  if (isNotificationsActive.value == true)
    return notificationData.value

  return messagesData.value
})

const readAll = async () => {
  await markNotificationsRead()
  reloadData()
}

const showUnread = (value: boolean) =>
  showUnreadNotifications.value == value ? 'selected' : ''

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

</script>