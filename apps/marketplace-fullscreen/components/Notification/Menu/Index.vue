<template lang="pug">
//-HeaderSubmenuWrapper(:align-right="true")  
VList(pos="fixed right-0 lg:right-2 lt-lg:left-0 lg:top-18" bg="ix-black" h="lt-lg:[calc(100vh-var(--header-height-mobile))]" w="lg:100" overflow-y="auto" z="200")
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
    button(p="2" b="selected:b-1 gray-400" @click="showMessige = false" :state ="isSelected('Notefications')") Notefications 
    button(p="2" @click="showMessige = true" :state ="isSelected('Messages')") Messages 
    div(grow="~")
  NotificationData(v-if="messagesData && showMessige" :data="messagesData")
  NotificationData(v-if="notificationData && !showMessige" :data="notificationData")
</template>

<script lang="ts" setup>
import mail from '~/assets/icons/mail.svg'

const {data: messagesData} = useNeMessages()
const {data: notificationData} = useNeNotifications()
const isMounted = useMounted()
const showMessige = ref(false)

const lockScroll = (active: boolean) => {
  document.body.classList.toggle("is-scroll-locked", active)
}


const isSelected = (title: string) => {
  if (title.toLowerCase() == 'messages' && showMessige) {
    return 'Selected'
  }
  return ''
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