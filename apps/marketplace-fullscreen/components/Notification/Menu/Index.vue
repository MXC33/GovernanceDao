<template lang="pug">
HeaderSubmenuWrapper(:align-right="true" w="25%")
  VList(pos="absolute top-full" bg="black")
    HList(p="3")
      div(text="xl") Inbox
    HList(p="3")
      div() show Only Read

    NotificationData(v-if="messagesData" :messagesData="messagesData")
</template>

<script lang="ts" setup>
const {data: messagesData} = useNeMessages()

const showRead = ref(false)
</script>