<template lang="pug">
//- remove hardcoded text and use jason data instead
VList(pos="fixed right-0 lg:right-2 lt-lg:left-0 lg:top-18" bg="ix-black" h="lt-lg:[calc(100vh-var(--header-height-mobile))]" w="lg:100" overflow-y="auto" z="200" b="~ gray-700")
  HList(p="3")
    div(text="xl") Inbox
  HList(p="3")
    div() Show Only Read
  button()
    HList(p="3" grow="~")
      div() Mark All as Read
      div(grow="~")
      mail(w="6" h="6")
  HList(space-x="3" items="center" bg="gray-700")
    div(grow="~")
    button(v-for="(title, index) in dataTitle" text="s-selected:ix-orange" b="s-selected:b-1" p="2" @click="dataIndex = index" :state="selected(index)") {{title}} 
    div(grow="~")

  //- fix this look bad having 2 NotificationData, should only use 1 and dynamically change the data to display
  NotificationData.no-scrollbar(overflow="auto" max-h="85" v-if="notificationData && dataIndex == 0" :data="notificationData")
  NotificationData.no-scrollbar(overflow="auto" max-h="85" v-if="messagesData && dataIndex == 1" :data="messagesData")
  
</template>

<script lang="ts" setup>
import mail from '~/assets/icons/mail.svg'

const {execute: fetchMessageDate, data: messagesData} = useNeMessages()
const {execute: fetchNotificationDate, data: notificationData} = useNeNotifications()
const isMounted = useMounted()
const dataIndex = ref(0)

const dataTitle = ['Notefications', 'Messages']

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
  if(!process.client) {
    return
  }
  lockScroll(enable)
}, {immediate: true})

onUnmounted(() => {
  lockScroll(false)
})

</script>