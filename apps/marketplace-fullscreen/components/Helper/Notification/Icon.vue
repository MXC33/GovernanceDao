<template lang="pug">
SuccessIcon(w="5" v-if="icon == 'success'")
FavoriteIcon(w="5" v-else-if="icon == 'add-favorite'")
PurchaseIcon(w="5" v-else-if="icon == 'purchase-confirmed'")
InsufficientIcon(w="5" v-else-if="icon == 'insufficient-funds'")
ErrorIcon(w="5" v-else-if="icon == 'transaction-error'")
</template>

<script lang="ts" setup>
import SuccessIcon from '~/assets/icons/notification/success.svg'
import FavoriteIcon from '~/assets/icons/notification/favorite.svg'
import PurchaseIcon from '~/assets/icons/notification/purchase.svg'
import InsufficientIcon from '~/assets/icons/notification/insufficient.svg'
import ErrorIcon from '~/assets/icons/notification/error.svg'
import type { NotificationType } from '~/composables/useNotifications'

defineProps<{
  icon: NotificationType
}>()
</script>