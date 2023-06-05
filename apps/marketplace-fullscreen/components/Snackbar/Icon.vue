<template lang="pug">
SuccessIcon(w="5" v-if="icon == 'success'")
FavoriteIcon(w="5" v-else-if="icon == 'favorite'")
InsufficientIcon(w="5" v-else-if="icon == 'purchase-warning'")
ErrorIcon(w="5" v-else-if="icon == 'error'")
</template>
  
<script lang="ts" setup>
import SuccessIcon from '~/assets/icons/notification/success.svg'
import FavoriteIcon from '~/assets/icons/notification/favorite.svg'
import InsufficientIcon from '~/assets/icons/notification/insufficient.svg'
import ErrorIcon from '~/assets/icons/notification/error.svg'
import type { SnackNotificationType } from '~/composables/useNotifications'


const { icon } = defineProps<{
  icon: SnackNotificationType
}>()
console.log("DISPLAY", icon)

</script>