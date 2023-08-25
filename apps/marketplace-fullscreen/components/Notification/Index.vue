<template lang ="pug">
button(@click="toggleNotification")
  BellFilled(v-if="!showNotification" w="6" h="6")
  BellEmpty(v-else w="6" h="6")
Transition(name="slide-top" mode="out-in")
  NotificationMenu(v-if="showNotification")
</template>

<script lang="ts" setup>
import BellFilled from '~/assets/icons/bellFilled.svg'
import BellEmpty from '~/assets/icons/bellEmpty.svg'
const showNotification = ref(false)

const toggleNotification = () => showNotification.value = !showNotification.value

</script>