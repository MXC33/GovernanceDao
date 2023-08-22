<template lang="pug">

VList(pos="relative top-70 " b="~ gray-400" bg="black")
  HList(p="3")
    div(text="xl") Inbox
  HList(p="3")
    div() show Only Read
  HList(p="3" grow="~")
    div() Mark All as Read
    div(grow="~")
    button() 
      mail(w="6" h="6")

  NotificationData(v-if="messagesData" :messagesData="messagesData")
</template>

<script lang="ts" setup>
import mail from '~/assets/icons/mail.svg'

const {data: messagesData} = useNeMessages()

const showRead = ref(false)
</script>