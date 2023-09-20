<template lang="pug">
VList(pos="absolute right-4 md:top-4 lt-md:(bottom-0 left-0 right-0)" w="md:80" z="9999" b="t-1 mc-mint md:(1 mc-mint_40)" bg="black" pointer-events="auto")
  div(bg="gray-800" p="x-2 t-2")
    SenderVideo(:sender="notification.sender" type="wide")

  VList(bg="black opacity-60" b="t-1 mc-mint md:mc-mint_40" text="sm")
    VList(overflow-y="auto" scrollbar="~ mc" max-h="50" space-y="6" py="4")
      div(px="4" space-y="2")
        TitleWithSquare(text="xs") {{ $t(`general.incoming`)}}
        TitleWithPointer(color="mc-orange" fill="mc-orange") {{ spaceCaseIt(notification.sender) }}

        div(align="left") 
          HelperWriter(:lines="notification.description" color="#f9f9f9")

      div(space-y="2" v-if="notification.errorCode" b="t-1 mc-mint_40" p="x-4 y-2")
        TitleWithPointer(color="mc-yellow")
          template(v-slot:icon)
            WarningIcon(w="6" fill="mc-yellow")

          template(v-slot:default) {{ $t(`general.detailedInformation`) }}

        p(align="left" color="mc-yellow" overflow="hidden") {{ notification.errorCode }}

    HList(w="full" min-w="0")
      ButtonSound(btn="~ primary-outline" min-w="0" sound="md-x" uppercase="~" @click="clickClose" w="full") {{$t(`general.close`)}}

      ButtonSound(btn="~ secondary" min-w="0" w="full" v-if="notification.link" sound="md" @click="navigateTo(notification.link.link)") {{  notification.link?.title }}

</template>

<script setup lang="ts">
import type { Notification } from '~~/composables/useNotifications';
import WarningIcon from '~/assets/images/ui/icon-warning.svg'
import { spaceCaseIt } from 'case-it'


const { markCurrentNotificationRead } = useNotifications()

const clickClose = () => markCurrentNotificationRead()

defineProps<{
  notification: Notification
}>()

</script>