<template lang="pug">
SuccessIcon(w="5" v-if="icon == 'success'")
FavoriteIcon(w="5" v-else-if="icon == 'favorite'")
InsufficientIcon(w="5" v-else-if="icon == 'purchase-warning'")
ErrorIcon(w="5" v-else-if="icon == 'error'")
div
</template>
  
<script lang="ts" setup>
import SuccessIcon from '~/assets/icon/notification/success.svg'
import FavoriteIcon from '~/assets/icon/notification/favorite.svg'
import InsufficientIcon from '~/assets/icon/notification/insufficient.svg'
import ErrorIcon from '~/assets/icon/notification/error.svg'
import type { SnackNotificationType } from '~/composables/useSnackNotifications'


const { icon } = defineProps<{
  icon: SnackNotificationType
}>()

</script>