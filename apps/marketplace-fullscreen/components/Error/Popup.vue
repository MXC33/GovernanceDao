<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) Error

  template(#default)
    VList()
      p {{ notification.description }}
      p {{ notification.errorCode }}

  template(#buttons)
    button(@click="onClick" btn="~ primary") Ok 

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { Notification } from '@ix/base/composables/utils/useNotifications'

const { markCurrentNotificationRead } = useNotifications()

const { notification } = defineProps<{
  notification: Notification
}>()

const onClick = () => {
  markCurrentNotificationRead()
}

</script>
  