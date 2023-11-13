<template lang="pug">
HList(@click="onClickSnack" frame="~ gray-400" p="x-4 y-3" bg="gray-800" space-x="3" items="center" pos="absolute right-0 bottom-0")

  SnackbarIcon(:icon="type")

  div(v-if="type != 'purchase-warning'" font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap") {{ message }}

  VList(v-else font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap") {{ message }}

</template>

<script lang="ts" setup>
import type { SnackbarItem } from 'composables/useSnackNotifications';

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

const { notification } = defineProps<{
  notification: SnackbarItem
}>()

const message = computed(() => t(`popupNotification.${notification.id}`))

</script>