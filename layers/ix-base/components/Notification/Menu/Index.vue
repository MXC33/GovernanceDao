<template lang="pug">
VList(pos="absolute right-0 lt:lg:right-4 lt-lg:left-0 top-full" bg="ix-black" max-h="lg:150" h="100vh" w="lg:100" overflow-y="auto" b="~ gray-700" text="white")
  VList(p="3")
    h3(text="xl") Inbox 

    div(grid="cols-2 ~")
      NotificationMenuTab(v-for="(title, index) in dataTitle" @click="dataIndex = index" :selected="dataIndex == index") {{ title }}

    HList(items="center" mt="6")
      div(grid="~ cols-2")
        button(btn="~ form sm on-selected:form-active" p="x-3 y-0"  @click="showUnreadNotifications = false" :selected="showUnread(false)") All

        button(btn="~ form sm on-selected:form-active" p="x-3 y-0" @click="showUnreadNotifications = true" :selected="showUnread(true)") Unread

      div(grow="~")

      button(btn="~ tertriary sm" px="2" @click="readAll") Mark All As Read

    VList(pos="relative" p="t-6 b-3" min-h="0")
      VList(disable="on-pending:active" :pending="isPending" min-h="0")

        Transition(name="fade" mode="out-in")

          NotificationData.no-scrollbar(overflow="auto" h="full" v-if="notifications" :data="notifications" )

          div(v-else opacity="80" text="center") No {{ activeType }} With Current Filter

      HelperLoader(mx="auto" wh="6" pos="absolute top-50% left-50%" translate-x="-50%" translate-y="-50%" fill="ix-orange" v-if="isPending")

  
</template>

<script lang="ts" setup>
// VList(pos="absolute lt-lg:left-0 right-0 top-full" bg="gray-800"  max-h="lg:150" z="200" min-w="100" frame="~" p="3" min-h="0" )

const { data: messagesData, refresh: refreshMessages, pending: isMessagesPending } = useNeMessages()
const { data: notificationData, refresh: refreshNotifications, markAllAsRead: markNotificationsRead, pending: isNotificationPending } = useNeNotifications()
const { showUnreadNotifications } = useNotificationSettings()

const isPending = computed(() => isMessagesPending.value || isNotificationPending.value)

const isMounted = useMounted()
const dataIndex = ref(0)
const dataTitle = ['Notifications', 'Messages']

const isNotificationsActive = computed(() => dataIndex.value == 0)

const activeType = computed(() => {
  return dataTitle[dataIndex.value]
})

const notifications = computed(() => {
  if (isNotificationsActive.value == true)
    return notificationData.value

  return messagesData.value
})


watch(showUnreadNotifications, () => {
  reloadData()
})

const readAll = async () => {
  await markNotificationsRead()
  reloadData()
}

const showUnread = (value: boolean) =>
  showUnreadNotifications.value == value

const reloadData = () => {
  refreshMessages()
  refreshNotifications()
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