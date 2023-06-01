<template lang="pug">
VList(pos="sticky bottom-6" z="300" @click="$emit('close')" w="full" items="end" px="6")  
  HList(frame="~ gray-400" px="4" py="3" bg="gray-800" space-x="3" items="center")
    HelperNotificationIcon(:icon="type")
    HList(font="bold" text="md" color="white" cursor="pointer" translate-y="0.15") {{ message }}
</template>

<script lang="ts" setup>
import type { SnackNotificationType } from '~/composables/useNotifications';

const { t } = useI18n()

const { type } = defineProps<{
  type: SnackNotificationType
}>()

const message = computed(() => t(`popupNotification.${type}`))

</script>