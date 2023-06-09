<template lang="pug">
HList(@click="onClickSnack" frame="~ gray-400" p="x-4 y-3" bg="gray-800" space-x="3" items="center" pos="absolute right-0 bottom-0")

  SnackbarIcon(:icon="type")

  div(v-if="type != 'purchase-warning'" font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap") {{ message }}

  VList(v-else font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap")
    span() {{ message }}
    span(text="sm" @click="openSwap") Buy/Swap IXT here

Popup(v-if="iFrameOpen")
  template(#header) Swap
  template(#default)
    VList(w="full" justify="center" items="center" display="lt-md:none")
      iframe(src="https://ix.foundation/lefi" w="full md:100" h="full md:116" )
    VList(w="full" justify="center" items="center" display="md:none")
      iframe(src="https://ix.foundation/lefi" w="100%" h="100")
  
</template>

<script lang="ts" setup>
import type { SnackNotification } from '~/composables/useNotifications';
const { viewingCart } = useCart()
const { t } = useI18n()
const { getSnackType, closeNotification } = useSnackNotifications()

const type = computed(() => getSnackType(notification))

const onClickSnack = () => {
  closeNotification(notification)

  switch (notification.id) {
    case 'add-to-cart':
      return viewingCart.value = true

    default:
      break
  }
}

const iFrameOpen = ref(false)

const openSwap = () => {
  iFrameOpen.value = !iFrameOpen.value
}

const { notification } = defineProps<{
  notification: SnackNotification
}>()

const message = computed(() => t(`popupNotification.${notification.id}`))

</script>