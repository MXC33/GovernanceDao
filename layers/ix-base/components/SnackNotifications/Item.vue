<template lang="pug">
HList(@click="onClickSnack" frame="~ gray-400" p="x-4 y-3" bg="gray-800" space-x="3" items="center" pos="absolute right-0 bottom-0")

  SnackNotificationsIcon(:icon="notification.type" v-if="notification.type")

  div(v-if="notification.type != 'warning'" font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap") {{ message }}

  VList(v-else font="bold" text="md" color="white" cursor="pointer" translate-y="0.15" whitespace="nowrap") {{ message }}

</template>

<script lang="ts" setup>
import type { SnackNotificationBase } from "~/composables/useSnackNotifications"

const { t } = useI18n()

const emit = defineEmits(["clickSnack"])

const onClickSnack = () => {
  emit("clickSnack", notification)
}

const { notification } = defineProps<{
  notification: SnackNotificationBase
}>()

const message = computed(() => t(`popupNotification.${notification.id}`))

</script>